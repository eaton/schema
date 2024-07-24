import { nanoid } from '@eatonfyi/ids';
import { z } from 'zod';
import { canParse, ParsedUrl } from '@eatonfyi/urls';

const idSeparator$1 = ".";
function toId(type, id) {
  const internalType = getMeta(type || "thing").type || "thing";
  if (typeof id === "string" && id.startsWith(internalType + idSeparator$1)) {
    return id;
  } else {
    return [internalType, id || nanoid()].join(idSeparator$1);
  }
}
function getMeta(input) {
  const schema = schemas().find((s) => s.name === input || s.type === input);
  if (schema === void 0)
    throw new TypeError(`No matching schema for '${input}'`);
  if (schema.type === void 0 || schema.collection === void 0) {
    if (schema.aliasOf) {
      return { ...getMeta(schema.aliasOf), ...schema };
    } else if (schema.parent) {
      return { ...getMeta(schema.parent), ...schema };
    } else {
      throw new TypeError(`No type, collection, or parent for '${input}`);
    }
  } else {
    return schema;
  }
}
function schemas() {
  return [
    { name: "Thing", type: "thing", collection: "things" },
    {
      name: "CreativeWork",
      parent: "Thing",
      type: "work",
      collection: "works"
    },
    {
      name: "Article",
      parent: "CreativeWork",
      type: "article",
      collection: "works"
    },
    {
      name: "SocialMediaPosting",
      parent: "Article",
      type: "post",
      collection: "works"
    },
    {
      name: "SocialMediaThread",
      parent: "SocialMediaPosting",
      type: "thread",
      collection: "works",
      isCustom: true
    },
    {
      name: "Bookmark",
      parent: "SocialMediaPosting",
      type: "link",
      collection: "works",
      isCustom: true
    },
    { name: "BlogPosting", parent: "SocialMediaPosting" },
    { name: "LiveBlogPosting", parent: "BlogPosting" },
    { name: "DiscussionForumPosting", parent: "SocialMediaPosting" },
    { name: "Blog", parent: "CreativeWork", type: "blog", collection: "works" },
    {
      name: "Book",
      parent: "CreativeWork",
      type: "book",
      collection: "products"
    },
    { name: "Clip", parent: "CreativeWork", type: "clip" },
    {
      name: "Collection",
      parent: "CreativeWork",
      type: "collection",
      collection: "works"
    },
    {
      name: "Comment",
      parent: "CreativeWork",
      type: "comment",
      collection: "works"
    },
    {
      name: "Conversation",
      parent: "CreativeWork",
      type: "chat",
      collection: "works"
    },
    { name: "Series", aliasOf: "CreativeWorkSeries" },
    {
      name: "CreativeWorkSeries",
      parent: "CreativeWork",
      type: "series",
      collection: "works"
    },
    { name: "VideoGameSeries", parent: "CreativeWorkSeries" },
    {
      name: "Periodical",
      parent: "CreativeWorkSeries",
      type: "magazine",
      collection: "works"
    },
    {
      name: "PodcastSeries",
      parent: "CreativeWorkSeries",
      type: "podcast",
      collection: "works"
    },
    {
      name: "TVSeries",
      parent: "CreativeWorkSeries",
      type: "show",
      collection: "works"
    },
    {
      name: "DefinedTermSet",
      parent: "CreativeWork",
      type: "taxonomy",
      collection: "works"
    },
    {
      name: "Episode",
      parent: "CreativeWork",
      type: "episode",
      collection: "works"
    },
    { name: "PodcastEpisode", parent: "Episode" },
    { name: "TVEpisode", parent: "Episode" },
    {
      name: "Game",
      parent: "CreativeWork",
      type: "game",
      collection: "products"
    },
    { name: "VideoGame", parent: "Game" },
    { name: "HowTo", parent: "CreativeWork" },
    { name: "Recipe", parent: "HowTo", type: "recipe", collection: "works" },
    {
      name: "JournalEntry",
      parent: "CreativeWork",
      type: "journal",
      collection: "works",
      isCustom: true
    },
    {
      name: "MediaObject",
      parent: "CreativeWork",
      type: "asset",
      collection: "assets"
    },
    { name: "ImageObject", parent: "CreativeWork" },
    { name: "VideoObject", parent: "CreativeWork" },
    { name: "AudioObject", parent: "CreativeWork" },
    {
      name: "Message",
      parent: "CreativeWork",
      type: "message",
      collection: "works"
    },
    {
      name: "EmailMessage",
      parent: "Message",
      type: "email",
      collection: "email"
    },
    {
      name: "Movie",
      parent: "CreativeWork",
      type: "movie",
      collection: "products"
    },
    {
      name: "MusicPlaylist",
      parent: "CreativeWork",
      type: "playlist",
      collection: "works"
    },
    {
      name: "MusicAlbum",
      parent: "MusicPlaylist",
      type: "album",
      collection: "products"
    },
    {
      name: "MusicRecording",
      parent: "CreativeWork",
      type: "song",
      collection: "products"
    },
    {
      name: "Photograph",
      parent: "CreativeWork",
      type: "photo",
      collection: "works"
    },
    {
      name: "Play",
      parent: "CreativeWork",
      type: "play",
      collection: "products"
    },
    {
      name: "Presentation",
      parent: "CreativeWork",
      type: "talk",
      collection: "works",
      isCustom: true
    },
    {
      name: "Project",
      parent: "CreativeWork",
      type: "project",
      collection: "works",
      isCustom: true
    },
    {
      name: "PublicationIssue",
      parent: "CreativeWork",
      type: "issue",
      collection: "works"
    },
    {
      name: "Quotation",
      parent: "CreativeWork",
      type: "quote",
      collection: "works"
    },
    {
      name: "Review",
      parent: "CreativeWork",
      type: "review",
      collection: "works"
    },
    {
      name: "ShortStory",
      parent: "CreativeWork",
      type: "story",
      collection: "works"
    },
    {
      name: "SoftwareApplication",
      parent: "CreativeWork",
      type: "app",
      collection: "products"
    },
    {
      name: "WebApplication",
      parent: "SoftwareApplication",
      type: "webapp",
      collection: "works"
    },
    {
      name: "SoftwareSourceCode",
      parent: "CreativeWork",
      type: "code",
      collection: "works"
    },
    {
      name: "VisualArtwork",
      parent: "CreativeWork",
      type: "art",
      collection: "works"
    },
    {
      name: "WebSite",
      parent: "CreativeWork",
      type: "site",
      collection: "works"
    },
    { name: "Event", parent: "Thing", type: "event", collection: "events" },
    {
      name: "EventSeries",
      parent: "Event",
      type: "events",
      collection: "events"
    },
    {
      name: "Engagement",
      parent: "Event",
      type: "engagement",
      collection: "events",
      isCustom: true
    },
    {
      name: "PresentationEvent",
      parent: "Event",
      type: "performance",
      collection: "events",
      isCustom: true
    },
    { name: "DefinedTerm", parent: "Thing", type: "term", collection: "terms" },
    { name: "Role", parent: "Thing", type: "role", collection: "things" },
    { name: "OrganizationRole", parent: "Role" },
    {
      name: "EmployeeRole",
      parent: "OrganizationRole",
      type: "job",
      collection: "things"
    },
    {
      name: "Organization",
      parent: "Thing",
      type: "org",
      collection: "things"
    },
    { name: "NewsMediaOrganization", parent: "Organization" },
    { name: "Person", parent: "Thing", type: "person", collection: "things" },
    { name: "Place", parent: "Thing", type: "place", collection: "things" },
    {
      name: "Product",
      parent: "Thing",
      type: "product",
      collection: "products"
    },
    {
      name: "HardwareDevice",
      parent: "Product",
      type: "device",
      collection: "products",
      isCustom: true
    }
  ];
}
function getId(input) {
  if (typeof input === "string" && input.indexOf(idSeparator$1) > -1) {
    return input.split(idSeparator$1)[1];
  } else if (typeof input !== "string") {
    const output = input.id.split(idSeparator$1).pop();
    if (output)
      return output;
  }
  throw new TypeError("Thing ID lacked required type prefix");
}
function getRawType(input) {
  if (typeof input === "string" && input.indexOf(idSeparator$1) > -1) {
    return input.split(idSeparator$1)[0];
  } else if (typeof input !== "string") {
    return input.type;
  }
  throw new TypeError("Thing ID lacked required type prefix");
}
function getSchema(input) {
  return getMeta(getRawType(input)).name;
}
function getType(input) {
  const schema = getMeta(getRawType(input));
  if (schema.type)
    return schema.type;
  throw new TypeError(`No type metadata found for '${input}`);
}
function getCollection(input) {
  const schema = getMeta(getRawType(input));
  if (schema.collection)
    return schema.collection;
  throw new TypeError(`No collection metadata found for '${input}`);
}
function listCollections() {
  const rawCollections = schemas().map((s) => s.collection).filter((s) => s !== void 0);
  return [...new Set(rawCollections).values()];
}

const ContactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  addresss: z.string().optional(),
  telephone: z.string().optional(),
  fax: z.string().optional(),
  url: z.string().url().optional()
}).describe("Contact information for a Person or Organization.");

function oneOrMany(schema, expand = false) {
  return schema.or(z.array(schema)).transform(
    (i) => expand ? i !== void 0 && Array.isArray(i) ? i : [i] : i
  );
}

function recordWithHints(schema, slots = []) {
  if (slots.length) {
    const slotSchemas = Object.fromEntries(
      slots.map((s) => [s, schema.optional()])
    );
    return z.record(schema).and(z.object(slotSchemas));
  } else {
    return z.record(schema);
  }
}

const SizeSchema = z.string().or(
  z.object({
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    depth: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    sizeUom: z.string().optional(),
    weightUom: z.string().optional()
  })
).transform((d) => typeof d === "string" ? parseStringDimensions(d) : d);
function parseStringDimensions(input) {
  const output = {
    width: void 0,
    height: void 0,
    depth: void 0,
    weight: void 0,
    sizeUom: void 0,
    weightUom: void 0,
    raw: input
  };
  const [width, height, depth] = output.raw.split(/[x⨯×]/g).map((s) => s.trim());
  if (width)
    output.width = Number.parseFloat(width);
  if (height)
    output.height = Number.parseFloat(height);
  if (depth)
    output.depth = Number.parseFloat(depth);
  return output;
}

const idSeparator = ".";
const idPattern = new RegExp(`[\\w@-_]+${idSeparator}[\\w@-_]+`);
const idSchema = z.coerce.string().regex(idPattern, { message: "Incorrect ID format." });

const urlSchema = z.instanceof(URL).or(z.string()).transform((t) => t && canParse(t.toString()) ? new ParsedUrl(t) : void 0);
const urlStringSchema = z.instanceof(URL).or(z.string().url()).transform((t) => t.toString());

const ThingSchema = z.object({
  id: idSchema,
  type: z.string().default("Thing"),
  name: z.string().optional(),
  alternateName: oneOrMany(z.string()).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  url: urlSchema.optional(),
  keywords: z.array(z.string()).optional(),
  isPartOf: oneOrMany(z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(z.string()).optional(),
  // none, one, or more string or string/order objects
  isMine: z.coerce.boolean().optional().describe(
    "Nonstandard flag to quickly indicate that an entitiy is canonically owned/created by me. Simpler than jamming myself in the creator field of everything."
  )
}).passthrough();

const CreativeWorkSchema = ThingSchema.extend({
  type: z.string().default("CreativeWork"),
  date: z.coerce.date().optional(),
  dates: z.record(z.coerce.date()).optional(),
  headline: z.string().optional(),
  creator: z.string().or(z.record(z.string().or(z.array(z.string())))).optional(),
  // Either a single string, or a dictionary of strings or string arrays.
  about: oneOrMany(z.string()).optional(),
  isPartOf: oneOrMany(z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(z.string()).optional(),
  // none, one, or more string or string/order objects
  publisher: z.string().optional(),
  archivedAt: z.string().optional(),
  text: z.string().optional(),
  commentCount: z.number().optional()
});

const BookmarkSchema = CreativeWorkSchema.extend({
  type: z.string().default("Bookmark"),
  sharedContent: urlSchema
});

const DeviceSchema = ThingSchema.extend({
  type: z.string().default("HardwareDevice"),
  dates: z.record(z.coerce.date()).optional(),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  platform: z.string().optional(),
  model: z.string().optional(),
  cpu: z.string().optional(),
  cores: z.coerce.number().optional(),
  mhz: z.string().optional(),
  mips: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  screen: SizeSchema.optional(),
  camera: SizeSchema.optional(),
  multi: z.coerce.number().optional(),
  msrp: z.string().optional(),
  notes: z.string().optional()
});

const SlideSchema = z.object({
  image: z.string().optional(),
  alt: z.string().optional(),
  text: z.string().optional(),
  isBonusSlide: z.coerce.boolean().optional()
});
const TalkEventSchema = z.object({
  event: z.string(),
  date: z.coerce.date().optional(),
  withTitle: z.string().optional(),
  isCanonicalVersion: z.coerce.boolean().optional(),
  description: z.string().optional(),
  recording: urlSchema.optional(),
  transcript: z.string().optional(),
  pdf: z.string().optional(),
  cuesheet: z.string().optional(),
  keynoteFile: z.string().optional(),
  url: z.string().optional()
});
const TalkSchema = CreativeWorkSchema.extend({
  type: z.string().default("Presentation"),
  performances: z.array(TalkEventSchema).optional(),
  keySlide: z.number().optional(),
  slides: z.array(SlideSchema).optional()
});

const ArticleSchema = CreativeWorkSchema.extend({
  type: z.string().default("Article"),
  section: z.string().optional(),
  pagination: z.string().optional()
});

const BookSchema = CreativeWorkSchema.extend({
  type: z.string().default("Book"),
  ids: z.record(z.coerce.string()).optional(),
  subtitle: z.string().optional(),
  edition: z.string().optional(),
  imprint: z.string().optional(),
  format: z.string().optional(),
  series: z.string().optional(),
  position: z.coerce.number().optional(),
  pages: z.coerce.number().optional(),
  // Personal propertieså
  owned: z.string().optional(),
  source: z.string().optional(),
  category: z.string().optional(),
  dimensions: SizeSchema.optional()
});
const PartialBookSchema = BookSchema.partial();

const CommentAuthorSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  mail: z.string().optional()
});
const CommentSchema = CreativeWorkSchema.extend({
  type: z.string().default("Comment"),
  parent: z.coerce.string().optional().describe("An entry ID or a URL the comment was posted in reply to."),
  thread: z.string().optional().describe(
    "A sortable representation of the comment's position in the thread."
  ),
  commenter: CommentAuthorSchema.optional()
});

const EpisodeSchema = CreativeWorkSchema.extend({
  type: z.string().default("Episode"),
  duration: z.coerce.string().optional().describe("ISO 8601 duration format"),
  episodeNumber: z.coerce.number().optional(),
  musicBy: z.string().optional()
});

const MessageSchema = CreativeWorkSchema.extend({
  type: z.string().default("Message"),
  discussionGroup: oneOrMany(z.string()).optional(),
  replyTo: oneOrMany(z.string()).optional(),
  from: z.string().optional(),
  to: oneOrMany(z.string()).optional(),
  cc: oneOrMany(z.string()).optional(),
  bcc: oneOrMany(z.string()).optional(),
  attachment: oneOrMany(z.string()).optional()
});

const ProjectSchema = CreativeWorkSchema.extend({
  type: z.string().default("Project"),
  usage: z.number().optional(),
  additionalType: z.string().optional()
});

const SocialMediaPostingSchema = CreativeWorkSchema.extend({
  type: z.string().default("SocialMediaPosting"),
  sharedContent: oneOrMany(urlSchema).optional()
});

const EventSchema = ThingSchema.extend({
  type: z.string().default("Event"),
  dates: recordWithHints(z.coerce.date(), ["start", "end"]).optional(),
  location: z.string().optional(),
  attendees: z.coerce.number().optional(),
  isPartOf: oneOrMany(z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(z.string()).optional()
  // none, one, or more string or string/order objects
});

const OrganizationSchema = ThingSchema.extend({
  type: z.string().default("Organization"),
  dates: recordWithHints(z.coerce.date(), [
    "founding",
    "dissolution"
  ]).optional(),
  places: z.record(z.string()).optional(),
  memberOf: oneOrMany(z.string()).optional()
  // none, one, or more string or string/order objects
});

const PersonSchema = ThingSchema.extend({
  type: z.string().default("Person"),
  dates: recordWithHints(z.coerce.date(), ["birth", "death"]).optional(),
  places: z.record(z.string()).optional(),
  knows: oneOrMany(z.string()).optional(),
  knowsAbout: oneOrMany(z.string()).optional(),
  isFictional: z.boolean().optional(),
  isPartOf: oneOrMany(z.string()).optional().describe(
    "For People, this includes organization membership, employment, etc."
  ),
  relation: z.record(z.string().or(z.array(z.string()))).optional()
  // Either a single string, or a dictionary of strings or string arrays.
});

const PlaceSchema = ThingSchema.extend({
  type: z.string().default("Place"),
  isVirtual: z.boolean().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  population: z.number().optional()
});

const RoleSchema = ThingSchema.extend({
  from: z.string(),
  to: z.string().or(ThingSchema),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
});

export { ArticleSchema, BookSchema, BookmarkSchema, CommentAuthorSchema, CommentSchema, ContactSchema, CreativeWorkSchema, DeviceSchema, EpisodeSchema, EventSchema, MessageSchema, OrganizationSchema, PartialBookSchema, PersonSchema, PlaceSchema, ProjectSchema, RoleSchema, SizeSchema, SlideSchema, SocialMediaPostingSchema, TalkEventSchema, TalkSchema, ThingSchema, getCollection, getId, getMeta, getRawType, getSchema, getType, idPattern, idSchema, idSeparator$1 as idSeparator, listCollections, oneOrMany, recordWithHints, schemas, toId, urlSchema, urlStringSchema };
