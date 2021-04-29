from probabilities import Probability

class Possibilities:
    def __init__(self, string1, string2):
        self.string1 = string1
        self.string2 = string2  # 18 13
        letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ"
        self.string1 = self.string1.upper()
        self.string2 = self.string2.upper()
        self.string1 = self.removePunc(self.string1)
        self.string2 = self.removePunc(self.string2)
        self.string2 = self.getOnlyAlpha(self.string2)
        if len(self.string2) > len(self.string1):
            self.string2 = self.formatLength(self.string1, self.string2)

        self.stringArray = []
        string = ""


    def getStringArray(self):
        p = Probability("textfiles\probabilities.txt")
        d = p.probDict
        string = ""
        print(self.string2)
        for i in range(len(self.string1)):
            for j in range(len(self.string2)):
                try:
                    string += p.getMatch(self.string1[i + j], self.string2[j], d)

                    if len(string.replace(" ", "")) % 5 == 0 and len(self.string2) > 9:
                        string += " "
                except Exception as e:
                    string = ""
                    break
            if len(string) > 0:
                self.stringArray.append(string)
            string = ""
        return self.stringArray

    def removePunc(self, string):
        punc = '''!()-[]{};:'"\, <>./?@#$%^&*_~'''
        for ele in string:
            if ele in punc:
                string = string.replace(ele, "")
        return string

    def formatLength(self, string1, string2):
        string = ""
        for i in range(len(string1)):
            string += string2[i]
        return string

    def getOnlyAlpha(self, string):
        str = ""
        for i in range(len(string)):
            if string[i].isalpha():
                str += string[i]
        return str
