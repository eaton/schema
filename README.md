# EatonFYI Data Schema

At a high level, I'm building a big pile of stuff that can cross-link to itself. No good reason, I just like the graphiness of it. Events, people, books and movies, organiations, blogs, places, quotations, and so on each get entries in the graph that can be referred to by an internal URN — same with my own content.

I've also added a few custom types on top of those to handle my own needs, in some cases redefining Schema.org types..

- CreativeWork/Project (in Schema.org language, this is a kind of organization. For me, it's a CreativeWork optionally for a particular employer.)
- CreativeWork/Presentation (A talk/presentation I delivered. Some are just metadata, others will have full slides, transcripts, etc.)
- CreativeWork/Note (A short piece of writing usually meant to give a personal status update, or share thoughts about some other item.)

Other types may be added, and "subtypes" for these might be necessary to keep things tidy. Project in particular might require a subtype to describe the kind of thing *that was created* as part of the project. Might also need some kind of thing to represent ephemera. All the other types (Thing, Person, Event, Organization, Place, CreativeWork, Book, Movie, etc) are just things that *can be mentioned* in my own posts.

In general, when a page is built for a `Thing`, Notes/Posts/Reprints/Links/Media `about` it should be listed as if they were the body of that `Thing`. This allows my scribbles about a book, or a particular topic, or a piece of software, to be splattered across a bunch of discontinuous posts but displayed on a single page.

Related: I want it to be possible to create a *thing* and tag it with potentially interesting topics… then turn the topics into things, if it's merited. Also, I want to be able to move things to and from (fairly) simple Markdown-with-frontmatter files as desired. The Connections between items and other references are an example of that. In several places, properties are described as Identifiers. An `Identifier` can be plaintext, a urn format ID for an item in my graph, or a fully realized `Thing` object. `urn:book:[ISBN]` or `urn:book:[ASIN]` or simply `[Title of Book]` could all be used when referencing a book; When creating Markdown files, entering a plain text name or a URN in frontmatter should be the common case. When filling things out for the eventual 11ty page build, URNs will be replaced by the items they point at.

```mermaid
classDiagram
    class Thing {
        uri identifier
        string type
        string additionalType
        string name
        List~string~ alternateName
        List~string~ sameAs
        string description
        url url
        url image
    }

    class Person {
        Dictionary~date~ date
        string familyName
        string givenName
        string honorificPrefix
        string honorificSuffix
        bool fictional
    }
    Thing <|-- Person : Is A

    class Persona {
        Identifier~Person~ person
        boolean private
    }
    Person <|-- Persona : Is A

    class Event {
        Dictionary~date~ date
        Identifier~Event~ parent
        Identifier~Place~ location
    }
    Thing <|-- Event : Is A

    class Organization {
        Identifier~Organization~ parent
        Dictionary~date~ date
        url logo
        string slogan
        number numberOfEmployees
    }
    Organization <-- Organization : parent
    Thing <|-- Organization : Is A

    class Place {
        Identifier~Place~ parent
        string geo
        number latitude
        number longitude
    }
    Place <-- Place : parent
    Thing <|-- Place : Is A

    class CreativeWork {
        Dict~urn~ ids
        List~Identifier~Thing~~ about
        Dict~date~ date
        Identifier~Person~ creator
        List~Identifier~Thing~~ keywords
        string abstract
        string headline
        string alternateHeadline
        string timeRequired
        string contentRating
        Identifier~CreativeWork~ isPartOf
        Identifier~CreativeWork~ series
        number seriesOrder
        uri archivedAt
    }
    Thing <|-- CreativeWork : Is A

    class Article {
        string articleSection
        string pagination
    }
    CreativeWork <|-- Article : Is A

    class Blog {
        Reference~Organization~ platform
    }
    CreativeWork <|-- Blog : Is A


    class Book {
        string subtitle
        string format
        string edition
        number pages
        Identifier~Organization~ publisher
        Identifier~Organization~ imprint
        Identifier~Series~ Series
        number seriesOrder
        dimensions dimensions
    }
    CreativeWork <|-- Book : Is A
 
    class Project {
        Reference~Organization~ employer
        Reference~Organization~ client
    }
    CreativeWork <|-- Project : Is A

    class Presentation {
        List~Reference~Event~~ presentedAt
        url slides
        url transcript
        url video
    }
    CreativeWork <|-- Presentation : Is A

    class SocialMediaPosting {
        List~Reference~CreativeWork~~ sharedContent
    }
    CreativeWork <|-- SocialMediaPosting : Is A

    class Connection {
        Identifier~Thing~ _from
        Identifier~Thing~ _to
        string type
        string subType
    }

    class Affiliation {
        Identifier~Person~ _from
        Identifier~Organization~ _to
        string jobTitle
        Dict~date~ date
    }
    Connection <|-- Affiliation : Is A

    class Contribution {
        Identifier~Person~ _from
        Identifier~CreativeWork~ _to
    }
    Connection <|-- Contribution : Is A
```
