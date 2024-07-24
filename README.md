# EatonFYI Data Schema

At a high level, I'm building a big pile of stuff that can cross-link to itself. No good reason, I just like the graphiness of it. Events, people, books and movies, organiations, blogs, places, quotations, and so on each get entries in the graph that can be referred to by an internal URN-like ID — same with my own content.

I've also added a few custom types on top of those to handle my own needs, in some cases redefining Schema.org types..

- CreativeWork/Project: in Schema.org language, this is a kind of organization. For me, it's a CreativeWork that represents an ongoing project I was part of, or a Role that I filled.=
- CreativeWork/Presentation: A talk/presentation I delivered. Some are just metadata, others will have full slides, transcripts, etc.
- CreativeWork/SocialMediaPosting/Bookmark: Bookmarks from services like Pinboard, Omnivore, and so on.
- CreativeWork/SocialMediaThread: Twitter, Mastodon, and other microblogging service content that was created as individual statuses but meant to form a coherent thread. Might expose it as a Series of some sort via the actual Schema.org metadata, but I want to store it as a coherent whole.

In general, when a page is built for a `Thing`, Notes/Posts/Bookmarks/Articles about it should be listed as if they were the part of the body content of that `Thing`. This allows my scribbles about a book, or a particular topic, or a piece of software, to be splattered across a bunch of discontinuous posts but displayed on a single page.

Tracking intangibles like curated lists, concepts that evolve out of or turn into series or articles, is left as an exercise for later. God knows there's enough meat here to keep me busy for ages.

## The Mapper

- Schema.org is really a serialization format, not a plan for storing and managing content, so this is kind of a goofy way to go about it. But here we are. This library also has an ugly "mapper" that can translate handy short typenames like 'post' and 'thread' to the full Schema.org names, and return other metadata like what storage bucket each type should go into. When I'm jamming everything into a document, store, that bucket corresponds to a collection or table name. When writing out files, it usually corresponds to a folder/subdirectory to avoid collisions.
