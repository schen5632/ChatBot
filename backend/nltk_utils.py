import numpy as np
import nltk
# nltk.download('punkt')
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    # splitting sentence into tokens
    return nltk.word_tokenize(sentence)


def stem(word):
    # converting words to stems
    return stemmer.stem(word.lower())

 
def bag_of_words(tokenized_sentence, words):
    # stem each word
    sentence_words = [stem(word) for word in tokenized_sentence]

    # initialize bag with 0 for each word and change to one if word is in sentence
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag
