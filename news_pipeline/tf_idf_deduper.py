from sklearn.feature_extraction.text import TfidfVectorizer

doc1 = "I like bella. I like xunan too"
doc2 = "I like bella. I dislike doctors"
doc3 = "Bella a day keeps doctor a way"
doc4 = "Never compare Bella with xunan"

documents = [doc1, doc2, doc3, doc4]

tfidf = TfidfVectorizer().fit_transform(documents)
pairwise_sim = tfidf * tfidf.T
print pairwise_sim.A