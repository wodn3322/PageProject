from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

# app config part
app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'paul_local'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:kjw9348792!@localhost:3306/user?charset=utf8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "userinfo"
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.CHAR(20), primary_key=True)
    password = db.Column(db.CHAR(30), nullable=False)

    def __init__(self, id, password):
        self.id = id
        self.password = password

    def __repr__(self):
        return f"{'id' : '{self.id}', 'password' : '{self.password}'}"


class Post(db.Model):
    __tablename__ = 'postinfo'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    id = db.Column(db.CHAR(20), db.ForeignKey("userinfo.id"), nullable=False)
    title = db.Column(db.CHAR(100), nullable=False)
    content = db.Column(db.TEXT, nullable=False)
    post_num = db.Column(db.INTEGER, primary_key=True)

    def __init__(self, id, title, content, post_num):
        self.id = id
        self.title = title
        self.content = content
        self.post_num = post_num

    def __repr__(self):
        return f"{'id' : '{self.id}', 'title' : '{self.title}, 'content' : {self.content}, 'post_num' : {self.post_num}'}"


# app router paty
@app.route('/')
def root():
    return "hi"


@app.route('/login', methods=['POST'])
def login():
    json = request.json
    id = json["id"]
    password = json["password"]
    print(json)
    if id != '' and password != '':
        try:
            user = db.session.query(User).filter_by(id=id).first()
            if user != None:
                if user.password == password:
                    res = jsonify("Old User Login successfully!")
                    res.status_code = 200
                    return res
                else:
                    res = jsonify("Please check password!")
                    res.status_code = 400
                    return res
            else:
                db.session.add(User(id, password))
                db.session.commit()
                res = jsonify("User added successfully!")
                res.status_code = 200
                return res
        except Exception as exception:
            return jsonify(str(exception))
    else:
        res = jsonify("Please provide name, email and pwd")
        res.status_code = 400
        return res

@app.route('/upload', methods=['POST'])
def upload():
    json = request.json
    id = json['id']
    title = json['title']
    content = json['content']
    print(id, title, content)
    user = db.session.query(User).filter_by(id=id).first()
    if user != None:
        post_num = db.session.query(Post).count() + 1
        db.session.add(Post(id, title, content, post_num))
        db.session.commit()
        res = jsonify("User post added successfully!")
        res.status_code = 200
        return res
    else:
        res = jsonify("User cannot find!!!!")
        return res


# @app.route('/upload', methods=['POST'])
# def upload():
#     if request.method == 'POST':
#         f = request.files['the_file']
#         f.save('/var/www/uploads/uploaded_file.txt')


# run part
if __name__ == '__main__':
    print(db)
    db.create_all()
    db.session.commit()
    CORS(app)
    app.run(host="0.0.0.0", port=5000)
