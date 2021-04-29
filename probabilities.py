class Probability:
    def __init__(self, filepath):
        self.filepath = filepath
        self.probDict = dict()
        letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        file = open(filepath, 'r')
        probArray = file.readlines()
        file.close()

        for i in range(len(letters)):
            temp = probArray[i]
            temp = temp.replace('\n', '')
            array = temp.split()
            self.probDict.update({letters[i]: array})

    def getPossibilities(self, d, char):
        arr = d[char]
        first = ""
        second = ""
        for ele in arr:
            first += ele[0] + ele[1]
            second += ele[1] + ele[0]

        return [first, second]

    def getMatch(self, cipherLetter, keyLetter, d):
        arr = d[cipherLetter]
        for i in range(len(arr)):
            if keyLetter in arr[i]:
                if arr[i].index(keyLetter) == 0:
                    return arr[i][1]
                else:
                    return arr[i][0]



    def getRows(self, cipher, d):
        arrTop = []
        arrBottom = []
        topRow = ""
        bottomRow = ""
        topSet = []
        bottomSet = []
        for i in range(len(cipher)):
            arrTop.append(self.getPossibilities(d, cipher[i])[0])
            arrBottom.append(self.getPossibilities(d, cipher[i])[1])
        print(arrBottom)
        for i in range(28):
            for j in range(len(cipher)):
                try:
                    topRow += arrTop[j][i]
                except Exception:
                     topRow += " "
                try:
                    bottomRow += arrBottom[j][i]
                except Exception:
                     bottomRow += " "
            topSet.append(topRow)
            topRow = ""
            bottomSet.append(bottomRow)
            bottomRow = ""

        return[topSet, bottomSet]



