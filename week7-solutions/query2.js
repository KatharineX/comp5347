db = db.getSiblingDB('wikipedia')

print(db.getCollection("revisions").find(
    {
        minor: true, 
    }
).count());

print(cursor);