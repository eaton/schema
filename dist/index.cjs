'use strict';

var ids = require('@eatonfyi/ids');
var zod = require('zod');
var urls = require('@eatonfyi/urls');

const idSeparator$1 = ".";
function toId(type, id) {
  const internalType = getMeta(type || "thing").type || "thing";
  if (typeof id === "string" && id.startsWith(internalType + idSeparator$1)) {
    return id;
  } else {
    return [internalType, id || ids.nanoid()].join(idSeparator$1);
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

const ContactSchema = zod.z.object({
  name: zod.z.string().optional(),
  email: zod.z.string().email().optional(),
  addresss: zod.z.string().optional(),
  telephone: zod.z.string().optional(),
  fax: zod.z.string().optional(),
  url: zod.z.string().url().optional()
}).describe("Contact information for a Person or Organization.");

function oneOrMany(schema, expand = false) {
  return schema.or(zod.z.array(schema)).transform(
    (i) => expand ? i !== void 0 && Array.isArray(i) ? i : [i] : i
  );
}

function recordWithHints(schema, slots = []) {
  if (slots.length) {
    const slotSchemas = Object.fromEntries(
      slots.map((s) => [s, schema.optional()])
    );
    return zod.z.record(schema).and(zod.z.object(slotSchemas));
  } else {
    return zod.z.record(schema);
  }
}

const SizeSchema = zod.z.string().or(
  zod.z.object({
    width: zod.z.coerce.number().optional(),
    height: zod.z.coerce.number().optional(),
    depth: zod.z.coerce.number().optional(),
    weight: zod.z.coerce.number().optional(),
    sizeUom: zod.z.string().optional(),
    weightUom: zod.z.string().optional()
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
const idSchema = zod.z.coerce.string().regex(idPattern, { message: "Incorrect ID format." });

const urlSchema = zod.z.instanceof(URL).or(zod.z.string()).transform((t) => t && urls.canParse(t.toString()) ? new urls.ParsedUrl(t) : void 0);
const urlStringSchema = zod.z.instanceof(URL).or(zod.z.string().url()).transform((t) => t.toString());

const ThingSchema = zod.z.object({
  id: idSchema,
  type: zod.z.string().default("Thing"),
  name: zod.z.string().optional(),
  alternateName: oneOrMany(zod.z.string()).optional(),
  description: zod.z.string().optional(),
  image: zod.z.string().optional(),
  url: urlSchema.optional(),
  keywords: zod.z.array(zod.z.string()).optional(),
  isPartOf: oneOrMany(zod.z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(zod.z.string()).optional(),
  // none, one, or more string or string/order objects
  isMine: zod.z.coerce.boolean().optional().describe("Nonstandard flag to quickly indicate that an entitiy is canonically owned/created by me. Simpler than jamming myself in the creator field of everything.")
}).passthrough();

const CreativeWorkSchema = ThingSchema.extend({
  type: zod.z.string().default("CreativeWork"),
  date: zod.z.coerce.date().optional(),
  dates: zod.z.record(zod.z.coerce.date()).optional(),
  headline: zod.z.string().optional(),
  creator: zod.z.string().or(zod.z.record(zod.z.string().or(zod.z.array(zod.z.string())))).optional(),
  // Either a single string, or a dictionary of strings or string arrays.
  about: oneOrMany(zod.z.string()).optional(),
  isPartOf: oneOrMany(zod.z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(zod.z.string()).optional(),
  // none, one, or more string or string/order objects
  publisher: zod.z.string().optional(),
  archivedAt: zod.z.string().optional(),
  text: zod.z.string().optional(),
  commentCount: zod.z.number().optional()
});

const EventSchema = ThingSchema.extend({
  type: zod.z.string().default("Event"),
  dates: recordWithHints(zod.z.coerce.date(), ["start", "end"]).optional(),
  location: zod.z.string().optional(),
  attendees: zod.z.coerce.number().optional(),
  isPartOf: oneOrMany(zod.z.string()).optional(),
  // none, one, or more string or string/order objects
  hasPart: oneOrMany(zod.z.string()).optional()
  // none, one, or more string or string/order objects
});

const OrganizationSchema = ThingSchema.extend({
  type: zod.z.string().default("Organization"),
  dates: recordWithHints(zod.z.coerce.date(), [
    "founding",
    "dissolution"
  ]).optional(),
  places: zod.z.record(zod.z.string()).optional(),
  memberOf: oneOrMany(zod.z.string()).optional()
  // none, one, or more string or string/order objects
});

const PersonSchema = ThingSchema.extend({
  type: zod.z.string().default("Person"),
  dates: recordWithHints(zod.z.coerce.date(), ["birth", "death"]).optional(),
  places: zod.z.record(zod.z.string()).optional(),
  knows: oneOrMany(zod.z.string()).optional(),
  knowsAbout: oneOrMany(zod.z.string()).optional(),
  isFictional: zod.z.boolean().optional(),
  isPartOf: oneOrMany(zod.z.string()).optional().describe(
    "For People, this includes organization membership, employment, etc."
  ),
  relation: zod.z.record(zod.z.string().or(zod.z.array(zod.z.string()))).optional()
  // Either a single string, or a dictionary of strings or string arrays.
});

const PlaceSchema = ThingSchema.extend({
  type: zod.z.string().default("Place"),
  isVirtual: zod.z.boolean().optional(),
  latitude: zod.z.number().optional(),
  longitude: zod.z.number().optional(),
  population: zod.z.number().optional()
});

const RoleSchema = ThingSchema.extend({
  from: zod.z.string(),
  to: zod.z.string().or(ThingSchema),
  startDate: zod.z.coerce.date().optional(),
  endDate: zod.z.coerce.date().optional()
});

const ArticleSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Article"),
  section: zod.z.string().optional(),
  pagination: zod.z.string().optional()
});

const BookSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Book"),
  ids: zod.z.record(zod.z.coerce.string()).optional(),
  subtitle: zod.z.string().optional(),
  edition: zod.z.string().optional(),
  imprint: zod.z.string().optional(),
  format: zod.z.string().optional(),
  series: zod.z.string().optional(),
  position: zod.z.coerce.number().optional(),
  pages: zod.z.coerce.number().optional(),
  // Personal propertieså
  owned: zod.z.string().optional(),
  source: zod.z.string().optional(),
  category: zod.z.string().optional(),
  dimensions: SizeSchema.optional()
});
const PartialBookSchema = BookSchema.partial();

const CommentAuthorSchema = zod.z.object({
  name: zod.z.string().optional(),
  url: zod.z.string().optional(),
  mail: zod.z.string().optional()
});
const CommentSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Comment"),
  parent: zod.z.coerce.string().optional().describe("An entry ID or a URL the comment was posted in reply to."),
  thread: zod.z.string().optional().describe(
    "A sortable representation of the comment's position in the thread."
  ),
  commenter: CommentAuthorSchema.optional()
});

const EpisodeSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Episode"),
  duration: zod.z.coerce.string().optional().describe("ISO 8601 duration format"),
  episodeNumber: zod.z.coerce.number().optional(),
  musicBy: zod.z.string().optional()
});

const MessageSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Message"),
  discussionGroup: oneOrMany(zod.z.string()).optional(),
  replyTo: oneOrMany(zod.z.string()).optional(),
  from: zod.z.string().optional(),
  to: oneOrMany(zod.z.string()).optional(),
  cc: oneOrMany(zod.z.string()).optional(),
  bcc: oneOrMany(zod.z.string()).optional(),
  attachment: oneOrMany(zod.z.string()).optional()
});

const SocialMediaPostingSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("SocialMediaPosting"),
  sharedContent: oneOrMany(urlSchema).optional()
});

const BookmarkSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Bookmark"),
  sharedContent: urlSchema
});

const DeviceSchema = ThingSchema.extend({
  type: zod.z.string().default("HardwareDevice"),
  dates: zod.z.record(zod.z.coerce.date()).optional(),
  category: zod.z.string().optional(),
  manufacturer: zod.z.string().optional(),
  platform: zod.z.string().optional(),
  model: zod.z.string().optional(),
  cpu: zod.z.string().optional(),
  cores: zod.z.coerce.number().optional(),
  mhz: zod.z.string().optional(),
  mips: zod.z.string().optional(),
  ram: zod.z.string().optional(),
  storage: zod.z.string().optional(),
  screen: SizeSchema.optional(),
  camera: SizeSchema.optional(),
  multi: zod.z.coerce.number().optional(),
  msrp: zod.z.string().optional(),
  notes: zod.z.string().optional()
});

const SlideSchema = zod.z.object({
  image: zod.z.string().optional(),
  alt: zod.z.string().optional(),
  text: zod.z.string().optional(),
  isBonusSlide: zod.z.coerce.boolean().optional()
});
const TalkEventSchema = zod.z.object({
  event: zod.z.string(),
  date: zod.z.coerce.date().optional(),
  withTitle: zod.z.string().optional(),
  isCanonicalVersion: zod.z.coerce.boolean().optional(),
  description: zod.z.string().optional(),
  recording: urlSchema.optional(),
  transcript: zod.z.string().optional(),
  pdf: zod.z.string().optional(),
  cuesheet: zod.z.string().optional(),
  keynoteFile: zod.z.string().optional(),
  url: zod.z.string().optional()
});
const TalkSchema = CreativeWorkSchema.extend({
  type: zod.z.string().default("Presentation"),
  performances: zod.z.array(TalkEventSchema).optional(),
  keySlide: zod.z.number().optional(),
  slides: zod.z.array(SlideSchema).optional()
});

exports.ArticleSchema = ArticleSchema;
exports.BookSchema = BookSchema;
exports.BookmarkSchema = BookmarkSchema;
exports.CommentAuthorSchema = CommentAuthorSchema;
exports.CommentSchema = CommentSchema;
exports.ContactSchema = ContactSchema;
exports.CreativeWorkSchema = CreativeWorkSchema;
exports.DeviceSchema = DeviceSchema;
exports.EpisodeSchema = EpisodeSchema;
exports.EventSchema = EventSchema;
exports.MessageSchema = MessageSchema;
exports.OrganizationSchema = OrganizationSchema;
exports.PartialBookSchema = PartialBookSchema;
exports.PersonSchema = PersonSchema;
exports.PlaceSchema = PlaceSchema;
exports.RoleSchema = RoleSchema;
exports.SizeSchema = SizeSchema;
exports.SlideSchema = SlideSchema;
exports.SocialMediaPostingSchema = SocialMediaPostingSchema;
exports.TalkEventSchema = TalkEventSchema;
exports.TalkSchema = TalkSchema;
exports.ThingSchema = ThingSchema;
exports.getCollection = getCollection;
exports.getId = getId;
exports.getMeta = getMeta;
exports.getRawType = getRawType;
exports.getSchema = getSchema;
exports.getType = getType;
exports.idPattern = idPattern;
exports.idSchema = idSchema;
exports.idSeparator = idSeparator$1;
exports.listCollections = listCollections;
exports.oneOrMany = oneOrMany;
exports.recordWithHints = recordWithHints;
exports.schemas = schemas;
exports.toId = toId;
exports.urlSchema = urlSchema;
exports.urlStringSchema = urlStringSchema;
