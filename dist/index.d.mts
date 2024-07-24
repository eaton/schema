import { z } from 'zod';
import * as url from 'url';
import * as _eatonfyi_urls from '@eatonfyi/urls';
import { ParsedUrl } from '@eatonfyi/urls';

declare const idSeparator = ".";
type SchemaRecord = {
    /**
     * The official Schema.org name of the schema
     */
    name: string;
    /**
     * The storage bucket, database table, or other collection items with this schema
     * should be stored in. If one is not given, its parent's collection will be used.
     */
    collection?: string;
    /**
     * The internal 'short name' for a schema, to be used when constructing keys, ids,
     * URL slugs, and so on. If one is not given, its parent's collection will be used.
     *
     * Note: Don't put multiple items with the same type into the mix; instead, create
     * a child with no type or collection. It will roll up to the parent automatically.
     */
    type?: string;
    /**
     * The parent schema this schema inherits from. Note that we're not handling Schemas
     * with multiple parents (aka VideoGame, which is both a CreativeWork > Game and a
     * CreativeWork > SoftwareApplication).
     */
    parent?: string;
    aliasOf?: string;
    /**
     * A flag indicating that the schema is a custom one not supported by Schema.org.
     * For the time being, we expose them as their Parent schema when building out
     * json-ld records, etc.
     */
    isCustom?: boolean;
};
interface WithId {
    id: string;
    type: string;
}
declare function toId(type?: string, id?: string | unknown): string;
/**
 * Given a schema name or shortname, return its record OR the first
 * parent record with type/collection information.
 */
declare function getMeta(input: string): SchemaRecord;
/**
 * An extremely abbreviated list of Schema.org schemas, with several custom additions.
 *
 * Additional schemas can be added to this array, and will then be handled properly
 * during persistence.
 */
declare function schemas(): SchemaRecord[];
declare function getId(input: string | WithId): string;
declare function getRawType(input: string | WithId): string;
declare function getSchema(input: string | WithId): string;
declare function getType(input: string | WithId): string;
declare function getCollection(input: string | WithId): string;
declare function listCollections(): string[];

declare const ContactSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    addresss: z.ZodOptional<z.ZodString>;
    telephone: z.ZodOptional<z.ZodString>;
    fax: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    addresss?: string | undefined;
    telephone?: string | undefined;
    fax?: string | undefined;
    url?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    addresss?: string | undefined;
    telephone?: string | undefined;
    fax?: string | undefined;
    url?: string | undefined;
}>;
type Contact = z.infer<typeof ContactSchema>;

declare function oneOrMany<T extends z.ZodTypeAny>(schema: T, expand?: boolean): z.ZodEffects<z.ZodUnion<[T, z.ZodArray<T, "many">]>, (T | z.ZodArray<T, "many">)["_output"] | ((T | z.ZodArray<T, "many">)["_output"] & any[]) | (T | z.ZodArray<T, "many">)["_output"][], (T | z.ZodArray<T, "many">)["_input"]>;

declare function recordWithHints<T extends z.ZodTypeAny>(schema: T, slots?: string[]): z.ZodRecord<z.ZodString, T> | z.ZodIntersection<z.ZodRecord<z.ZodString, T>, z.ZodObject<{
    [k: string]: z.ZodOptional<T>;
}, "strip", z.ZodTypeAny, { [k_1 in keyof z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    [k: string]: z.ZodOptional<T>;
}>, undefined extends T["_output"] | undefined ? never : string>]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    [k: string]: z.ZodOptional<T>;
}>, undefined extends T["_output"] | undefined ? never : string>[k_1]; }, { [k_2 in keyof z.baseObjectInputType<{
    [k: string]: z.ZodOptional<T>;
}>]: z.baseObjectInputType<{
    [k: string]: z.ZodOptional<T>;
}>[k_2]; }>>;

/**
 * We're going to abuse this horribly to represent physical size, size of digital documents,
 * and screen/image resolutions.
 *
 * When physical items are being discussed:
 * Width x Height x Depth [sizeUom], Weight [weightUom]
 *
 * For screen and imaging devices:
 * Width x Height x Depth [sizeUom == color depth], Weight [weightUom] = Pixels Per Uom
 *
 * For digital files:
 *
 * Width x Height [sizeUom], Weight [weightUom] = Binary File Size
 */
declare const SizeSchema: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    depth: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    sizeUom: z.ZodOptional<z.ZodString>;
    weightUom: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    width?: number | undefined;
    height?: number | undefined;
    depth?: number | undefined;
    weight?: number | undefined;
    sizeUom?: string | undefined;
    weightUom?: string | undefined;
}, {
    width?: number | undefined;
    height?: number | undefined;
    depth?: number | undefined;
    weight?: number | undefined;
    sizeUom?: string | undefined;
    weightUom?: string | undefined;
}>]>, {
    width?: number | undefined;
    height?: number | undefined;
    depth?: number | undefined;
    weight?: number | undefined;
    sizeUom?: string | undefined;
    weightUom?: string | undefined;
}, string | {
    width?: number | undefined;
    height?: number | undefined;
    depth?: number | undefined;
    weight?: number | undefined;
    sizeUom?: string | undefined;
    weightUom?: string | undefined;
}>;
type Size = z.infer<typeof SizeSchema>;

declare const idPattern: RegExp;
declare const idSchema: z.ZodString;

declare const urlSchema: z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, ParsedUrl | undefined, string | url.URL>;
declare const urlStringSchema: z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, string, string | url.URL>;

declare const CreativeWorkSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    date: z.ZodOptional<z.ZodDate>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
type CreativeWork = z.infer<typeof CreativeWorkSchema>;
type CreativeWorkInput = typeof CreativeWorkSchema._input;

declare const EventSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    location: z.ZodOptional<z.ZodString>;
    attendees: z.ZodOptional<z.ZodNumber>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    location: z.ZodOptional<z.ZodString>;
    attendees: z.ZodOptional<z.ZodNumber>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    location: z.ZodOptional<z.ZodString>;
    attendees: z.ZodOptional<z.ZodNumber>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">>;
type Event = z.infer<typeof EventSchema>;

declare const OrganizationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    memberOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    memberOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    memberOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">>;
type Organization = z.infer<typeof OrganizationSchema>;

declare const PersonSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    knows: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    knowsAbout: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isFictional: z.ZodOptional<z.ZodBoolean>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    relation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    knows: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    knowsAbout: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isFictional: z.ZodOptional<z.ZodBoolean>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    relation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>> | z.ZodOptional<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodDate>, z.ZodObject<{
        [k: string]: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: Date | undefined;
    }, {
        [x: string]: Date | undefined;
    }>>>;
    places: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    knows: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    knowsAbout: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isFictional: z.ZodOptional<z.ZodBoolean>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    relation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>>;
}, z.ZodTypeAny, "passthrough">>;
type Person = z.infer<typeof PersonSchema>;

declare const PlaceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    isVirtual: z.ZodOptional<z.ZodBoolean>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    population: z.ZodOptional<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    isVirtual: z.ZodOptional<z.ZodBoolean>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    population: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    isVirtual: z.ZodOptional<z.ZodBoolean>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    population: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
type Place = z.infer<typeof PlaceSchema>;

declare const RoleSchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    from: z.ZodString;
    to: z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>]>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    from: z.ZodString;
    to: z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>]>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    from: z.ZodString;
    to: z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        type: z.ZodDefault<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
        isMine: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>]>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
}, z.ZodTypeAny, "passthrough">>;
type Role = z.infer<typeof RoleSchema>;

declare const ThingSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    type: z.ZodDefault<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">>;
type Thing = z.infer<typeof ThingSchema>;

declare const ArticleSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pagination: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pagination: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    section: z.ZodOptional<z.ZodString>;
    pagination: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
type Article = z.infer<typeof ArticleSchema>;

declare const BookSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    ids: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    subtitle: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    imprint: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodNumber>;
    pages: z.ZodOptional<z.ZodNumber>;
    owned: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    dimensions: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    ids: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    subtitle: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    imprint: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodNumber>;
    pages: z.ZodOptional<z.ZodNumber>;
    owned: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    dimensions: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    ids: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    subtitle: z.ZodOptional<z.ZodString>;
    edition: z.ZodOptional<z.ZodString>;
    imprint: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodString>;
    series: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodNumber>;
    pages: z.ZodOptional<z.ZodNumber>;
    owned: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    dimensions: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
}, z.ZodTypeAny, "passthrough">>;
type Book = z.infer<typeof BookSchema>;
declare const PartialBookSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    url: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    id: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    isPartOf: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    hasPart: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    isMine: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    dates: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>>;
    headline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    creator: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>>;
    about: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    publisher: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    archivedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    commentCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ids: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    subtitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    edition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imprint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    format: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    series: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    position: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    pages: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    owned: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    url: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    id: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    isPartOf: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    hasPart: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    isMine: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    dates: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>>;
    headline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    creator: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>>;
    about: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    publisher: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    archivedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    commentCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ids: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    subtitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    edition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imprint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    format: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    series: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    position: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    pages: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    owned: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    url: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>>;
    date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    id: z.ZodOptional<z.ZodString>;
    alternateName: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    isPartOf: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    hasPart: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    isMine: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    dates: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>>;
    headline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    creator: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>>;
    about: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>>;
    publisher: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    archivedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    commentCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ids: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>;
    subtitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    edition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imprint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    format: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    series: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    position: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    pages: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    owned: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>>;
}, z.ZodTypeAny, "passthrough">>;
type PartialBook = z.infer<typeof PartialBookSchema>;

declare const CommentAuthorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    mail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    url?: string | undefined;
    mail?: string | undefined;
}, {
    name?: string | undefined;
    url?: string | undefined;
    mail?: string | undefined;
}>;
declare const CommentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    parent: z.ZodOptional<z.ZodString>;
    thread: z.ZodOptional<z.ZodString>;
    commenter: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        mail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    parent: z.ZodOptional<z.ZodString>;
    thread: z.ZodOptional<z.ZodString>;
    commenter: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        mail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    parent: z.ZodOptional<z.ZodString>;
    thread: z.ZodOptional<z.ZodString>;
    commenter: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        mail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }, {
        name?: string | undefined;
        url?: string | undefined;
        mail?: string | undefined;
    }>>;
}, z.ZodTypeAny, "passthrough">>;
type CommentAuthor = z.infer<typeof CommentAuthorSchema>;
type Comment = z.infer<typeof CommentSchema>;
type CommentInput = typeof CommentSchema._input;

declare const EpisodeSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodNumber>;
    musicBy: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodNumber>;
    musicBy: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    episodeNumber: z.ZodOptional<z.ZodNumber>;
    musicBy: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
type Episode = z.infer<typeof EpisodeSchema>;

declare const MessageSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    discussionGroup: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    replyTo: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    cc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    bcc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    attachment: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    discussionGroup: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    replyTo: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    cc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    bcc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    attachment: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    discussionGroup: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    replyTo: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    cc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    bcc: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    attachment: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
}, z.ZodTypeAny, "passthrough">>;
type Message = z.infer<typeof MessageSchema>;

declare const SocialMediaPostingSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, z.ZodArray<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, "many">]>, _eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | (_eatonfyi_urls.ParsedUrl & any[]) | ((_eatonfyi_urls.ParsedUrl | undefined)[] & any[]) | (_eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | undefined)[] | undefined, string | url.URL | (string | url.URL)[]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, z.ZodArray<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, "many">]>, _eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | (_eatonfyi_urls.ParsedUrl & any[]) | ((_eatonfyi_urls.ParsedUrl | undefined)[] & any[]) | (_eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | undefined)[] | undefined, string | url.URL | (string | url.URL)[]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, z.ZodArray<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>, "many">]>, _eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | (_eatonfyi_urls.ParsedUrl & any[]) | ((_eatonfyi_urls.ParsedUrl | undefined)[] & any[]) | (_eatonfyi_urls.ParsedUrl | (_eatonfyi_urls.ParsedUrl | undefined)[] | undefined)[] | undefined, string | url.URL | (string | url.URL)[]>>;
}, z.ZodTypeAny, "passthrough">>;
type SocialMediaPosting = z.infer<typeof SocialMediaPostingSchema>;

/**
 * A special-case version of the base SocialMediaPosting type that
 * we use to store bookmarks and shared links from a variety of sources.
 *
 * Note that the link being shared goes in `sharedContent`, not `url`;
 * the url property is the canonical URL of the post in which the link
 * is shared.
 *
 * If the original version of a link is dead-dead but an archived version
 * is available (e.g., through the Wayback Machine), use the isArchivedAt
 * property from the base CreativeWorkSchema.
 */
declare const BookmarkSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    sharedContent: z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>;
}, z.ZodTypeAny, "passthrough">>;
type Bookmark = z.infer<typeof BookmarkSchema>;

declare const DeviceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    category: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    cpu: z.ZodOptional<z.ZodString>;
    cores: z.ZodOptional<z.ZodNumber>;
    mhz: z.ZodOptional<z.ZodString>;
    mips: z.ZodOptional<z.ZodString>;
    ram: z.ZodOptional<z.ZodString>;
    storage: z.ZodOptional<z.ZodString>;
    screen: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    camera: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    multi: z.ZodOptional<z.ZodNumber>;
    msrp: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    category: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    cpu: z.ZodOptional<z.ZodString>;
    cores: z.ZodOptional<z.ZodNumber>;
    mhz: z.ZodOptional<z.ZodString>;
    mips: z.ZodOptional<z.ZodString>;
    ram: z.ZodOptional<z.ZodString>;
    storage: z.ZodOptional<z.ZodString>;
    screen: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    camera: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    multi: z.ZodOptional<z.ZodNumber>;
    msrp: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    type: z.ZodDefault<z.ZodString>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    category: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    cpu: z.ZodOptional<z.ZodString>;
    cores: z.ZodOptional<z.ZodNumber>;
    mhz: z.ZodOptional<z.ZodString>;
    mips: z.ZodOptional<z.ZodString>;
    ram: z.ZodOptional<z.ZodString>;
    storage: z.ZodOptional<z.ZodString>;
    screen: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    camera: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        depth: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        sizeUom: z.ZodOptional<z.ZodString>;
        weightUom: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>]>, {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }, string | {
        width?: number | undefined;
        height?: number | undefined;
        depth?: number | undefined;
        weight?: number | undefined;
        sizeUom?: string | undefined;
        weightUom?: string | undefined;
    }>>;
    multi: z.ZodOptional<z.ZodNumber>;
    msrp: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
type Device = z.infer<typeof DeviceSchema>;

declare const SlideSchema: z.ZodObject<{
    image: z.ZodOptional<z.ZodString>;
    alt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    isBonusSlide: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    image?: string | undefined;
    alt?: string | undefined;
    text?: string | undefined;
    isBonusSlide?: boolean | undefined;
}, {
    image?: string | undefined;
    alt?: string | undefined;
    text?: string | undefined;
    isBonusSlide?: boolean | undefined;
}>;
type Slide = z.infer<typeof SlideSchema>;
declare const TalkEventSchema: z.ZodObject<{
    event: z.ZodString;
    date: z.ZodOptional<z.ZodDate>;
    withTitle: z.ZodOptional<z.ZodString>;
    isCanonicalVersion: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    recording: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    transcript: z.ZodOptional<z.ZodString>;
    pdf: z.ZodOptional<z.ZodString>;
    cuesheet: z.ZodOptional<z.ZodString>;
    keynoteFile: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    event: string;
    date?: Date | undefined;
    withTitle?: string | undefined;
    isCanonicalVersion?: boolean | undefined;
    description?: string | undefined;
    recording?: _eatonfyi_urls.ParsedUrl | undefined;
    transcript?: string | undefined;
    pdf?: string | undefined;
    cuesheet?: string | undefined;
    keynoteFile?: string | undefined;
    url?: string | undefined;
}, {
    event: string;
    date?: Date | undefined;
    withTitle?: string | undefined;
    isCanonicalVersion?: boolean | undefined;
    description?: string | undefined;
    recording?: string | url.URL | undefined;
    transcript?: string | undefined;
    pdf?: string | undefined;
    cuesheet?: string | undefined;
    keynoteFile?: string | undefined;
    url?: string | undefined;
}>;
type TalkInstance = z.infer<typeof TalkEventSchema>;
declare const TalkSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    performances: z.ZodOptional<z.ZodArray<z.ZodObject<{
        event: z.ZodString;
        date: z.ZodOptional<z.ZodDate>;
        withTitle: z.ZodOptional<z.ZodString>;
        isCanonicalVersion: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        recording: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        transcript: z.ZodOptional<z.ZodString>;
        pdf: z.ZodOptional<z.ZodString>;
        cuesheet: z.ZodOptional<z.ZodString>;
        keynoteFile: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: _eatonfyi_urls.ParsedUrl | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: string | url.URL | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }>, "many">>;
    keySlide: z.ZodOptional<z.ZodNumber>;
    slides: z.ZodOptional<z.ZodArray<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        isBonusSlide: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    performances: z.ZodOptional<z.ZodArray<z.ZodObject<{
        event: z.ZodString;
        date: z.ZodOptional<z.ZodDate>;
        withTitle: z.ZodOptional<z.ZodString>;
        isCanonicalVersion: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        recording: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        transcript: z.ZodOptional<z.ZodString>;
        pdf: z.ZodOptional<z.ZodString>;
        cuesheet: z.ZodOptional<z.ZodString>;
        keynoteFile: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: _eatonfyi_urls.ParsedUrl | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: string | url.URL | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }>, "many">>;
    keySlide: z.ZodOptional<z.ZodNumber>;
    slides: z.ZodOptional<z.ZodArray<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        isBonusSlide: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    name: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
    date: z.ZodOptional<z.ZodDate>;
    id: z.ZodString;
    alternateName: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isPartOf: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    hasPart: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    isMine: z.ZodOptional<z.ZodBoolean>;
    dates: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodDate>>;
    headline: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>]>>;
    about: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string | string[] | ((string | string[]) & any[]) | (string | string[])[], string | string[]>>;
    publisher: z.ZodOptional<z.ZodString>;
    archivedAt: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    commentCount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodDefault<z.ZodString>;
    performances: z.ZodOptional<z.ZodArray<z.ZodObject<{
        event: z.ZodString;
        date: z.ZodOptional<z.ZodDate>;
        withTitle: z.ZodOptional<z.ZodString>;
        isCanonicalVersion: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        recording: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodType<url.URL, z.ZodTypeDef, url.URL>, z.ZodString]>, _eatonfyi_urls.ParsedUrl | undefined, string | url.URL>>;
        transcript: z.ZodOptional<z.ZodString>;
        pdf: z.ZodOptional<z.ZodString>;
        cuesheet: z.ZodOptional<z.ZodString>;
        keynoteFile: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: _eatonfyi_urls.ParsedUrl | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }, {
        event: string;
        date?: Date | undefined;
        withTitle?: string | undefined;
        isCanonicalVersion?: boolean | undefined;
        description?: string | undefined;
        recording?: string | url.URL | undefined;
        transcript?: string | undefined;
        pdf?: string | undefined;
        cuesheet?: string | undefined;
        keynoteFile?: string | undefined;
        url?: string | undefined;
    }>, "many">>;
    keySlide: z.ZodOptional<z.ZodNumber>;
    slides: z.ZodOptional<z.ZodArray<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        isBonusSlide: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }, {
        image?: string | undefined;
        alt?: string | undefined;
        text?: string | undefined;
        isBonusSlide?: boolean | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
type Talk = z.infer<typeof TalkSchema>;

export { type Article, ArticleSchema, type Book, BookSchema, type Bookmark, BookmarkSchema, type Comment, type CommentAuthor, CommentAuthorSchema, type CommentInput, CommentSchema, type Contact, ContactSchema, type CreativeWork, type CreativeWorkInput, CreativeWorkSchema, type Device, DeviceSchema, type Episode, EpisodeSchema, type Event, EventSchema, type Message, MessageSchema, type Organization, OrganizationSchema, type PartialBook, PartialBookSchema, type Person, PersonSchema, type Place, PlaceSchema, type Role, RoleSchema, type SchemaRecord, type Size, SizeSchema, type Slide, SlideSchema, type SocialMediaPosting, SocialMediaPostingSchema, type Talk, TalkEventSchema, type TalkInstance, TalkSchema, type Thing, ThingSchema, getCollection, getId, getMeta, getRawType, getSchema, getType, idPattern, idSchema, idSeparator, listCollections, oneOrMany, recordWithHints, schemas, toId, urlSchema, urlStringSchema };
