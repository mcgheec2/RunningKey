from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from probabilities import Probability
from possibilities import Possibilities

app = Flask(__name__)
bootstrap = Bootstrap(app)

punc = '''!()-[]{};:'"\, <>./?@#$%^&*_~'''
'''this function is similar to the JinjaApp however it has the option to post new items to the todo list
    when it does the items are added to the todo list in the given day. if an invalid input is given it 
    sends the user to an error page where they can the index page'''
@app.route('/', methods=['GET', 'POST'])
def index():
    # name = 'Craig'
    # days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    # todo = {
    #     'Mo' : {'work' : '9-5', 'dinner': '6-9'},
    #     'Tu' : {'work' : '9-5'},
    #     'We' : {'work' : '9-5'},
    #     'Th' : {'work' : '9-5'},
    #     'Fr' : {'work' : '9-5', 'party':  '9-2'},
    #     'Sa' : {'none' : 'all day'},
    #     'Su' : {'football' : 'all day'}
    #
    # }
    # new_day = ""
    # todo_item = ""
    # new_time = ""
    # try:
    #     if request.method == 'POST' and 'day' in request.form:
    #         new_day = request.form['day']
    #     if request.method == 'POST' and 'to do item' in request.form:
    #         todo_item = request.form['to do item']
    #     if request.method == 'POST' and 'time' in request.form:
    #         new_time = request.form['time']
    #         todo[new_day].update({todo_item: new_time})
    # except Exception:
    #     return render_template('error.html')
    #
    # # name = None
    # # if request.method == 'POST' and 'name' in request.form:
    # #     name = request.form['name']

    #ciphertext = ""
    ciphertext = None
    validCipher = True
    message = ""
    if request.method == 'POST' and 'ciphertext' and not 'plaintext' in request.form:
        ciphertext = request.form['ciphertext']

        ciphertext = ciphertext.replace(' ', '')
        ciphertext = ciphertext.upper()

        for ele in ciphertext:
            if ele in punc:
                validCipher = False
                break
        if validCipher == True and not ciphertext.isalpha():
            validCipher = False

        if validCipher == True:
            p = Probability('textfiles\probabilities.txt')
            probDict = p.probDict
            topAndBottom = p.getRows(ciphertext, probDict)
            ciphertext = getOnlyAlpha(ciphertext)
            for i in range(len(ciphertext)):
                message += " "
            maxlen = len(message) + (len(message) // 5)
            return render_template('running.html', ciphertext=ciphertext, topAndBottom=topAndBottom, message=message, messageLen=maxlen)

    elif request.method == 'POST' and 'ciphertext' and 'plaintext' in request.form:
        ciphertext = request.form['ciphertext']

        ciphertext = ciphertext.replace(' ', '')
        ciphertext = ciphertext.upper()

        for ele in ciphertext:
            if ele in punc:
                validCipher = False
                break
        if validCipher == True and not ciphertext.isalpha():
            validCipher = False

        if validCipher == True:
            p = Probability('textfiles\probabilities.txt')
            probDict = p.probDict
            topAndBottom = p.getRows(ciphertext, probDict)
            plaintext = ""
            word = ""
            if len(request.form['plaintext']) > 0:
                plaintext = request.form['plaintext']
                word = solve(ciphertext, plaintext)
            for i in range(len(ciphertext)):
                message += " "
            maxlen = len(message) + (len(message) // 5)
            return render_template('running.html', ciphertext=ciphertext, topAndBottom=topAndBottom, message=message, messageLen=maxlen, plaintext=plaintext, words=word)




    return render_template('index.html', ciphertext=ciphertext)



def solve(cipher, plain):
    pos = Possibilities(cipher, plain)
    arr = pos.getStringArray()
    return arr

def getOnlyAlpha(string):
    str = ""
    for i in range(len(string)):
        if string[i].isalpha():
            str += string[i]
    return str

if __name__ == '__main__':
    app.run(debug=True)


