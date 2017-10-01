import mongodb_client as client 

def test_basic():
    db = client.get_db('test')
    print 'created a text DB'
    db.textCollection.drop()
    assert db.textCollection.count() == 0
    db.textCollection.insert({"address": "53 pitman street", "Name": "Bella"})
    assert db.textCollection.count() == 1
    db.textCollection.drop()
    assert db.textCollection.count() == 0
    print "test_basic passed"

if __name__ == '__main__':
    test_basic()