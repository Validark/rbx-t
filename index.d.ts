/** checks to see if `value` is a T */
type check<T> = (value: any) => value is T;

interface t {
	// lua types
	/** checks to see if `value` is an any */
	any: (value: any) => value is any;
	/** checks to see if `value` is a boolean */
	boolean: (value: any) => value is boolean;
	/** checks to see if `value` is a thread */
	coroutine: (value: any) => value is thread;
	/** checks to see if `value` is a Function */
	callback: (value: any) => value is Function;
	/** checks to see if `value` is Function */
	none: (value: any) => value is undefined;
	/** checks to see if `value` is a number, will _not_ match NaN */
	number: (value: any) => value is number;
	/** checks to see if `value` is NaN */
	nan: (value: any) => value is number;
	/** checks to see if `value` is a string */
	string: (value: any) => value is string;
	/** checks to see if `value` is an object */
	table: (value: any) => value is object;
	/** checks to see if `value` is a userdata */
	userdata: (value: any) => value is object;

	// roblox types
	/** checks to see if `value` is an Axes */
	Axes: (value: any) => value is Axes;
	/** checks to see if `value` is a BrickColor */
	BrickColor: (value: any) => value is BrickColor;
	/** checks to see if `value` is a CFrame */
	CFrame: (value: any) => value is CFrame;
	/** checks to see if `value` is a Color3 */
	Color3: (value: any) => value is Color3;
	/** checks to see if `value` is a ColorSequence */
	ColorSequence: (value: any) => value is ColorSequence;
	/** checks to see if `value` is a ColorSequenceKeypoint */
	ColorSequenceKeypoint: (value: any) => value is ColorSequenceKeypoint;
	/** checks to see if `value` is a DockWidgetPluginGuiInfo */
	DockWidgetPluginGuiInfo: (value: any) => value is DockWidgetPluginGuiInfo;
	/** checks to see if `value` is a Faces */
	Faces: (value: any) => value is Faces;
	/** checks to see if `value` is an Instance */
	Instance: (value: any) => value is Instance;
	/** checks to see if `value` is a NumberRange */
	NumberRange: (value: any) => value is NumberRange;
	/** checks to see if `value` is a NumberSequence */
	NumberSequence: (value: any) => value is NumberSequence;
	/** checks to see if `value` is a NumberSequenceKeypoint */
	NumberSequenceKeypoint: (value: any) => value is NumberSequenceKeypoint;
	/** checks to see if `value` is a PathWaypoint */
	PathWaypoint: (value: any) => value is PathWaypoint;
	/** checks to see if `value` is a PhysicalProperties */
	PhysicalProperties: (value: any) => value is PhysicalProperties;
	/** checks to see if `value` is a Random */
	Random: (value: any) => value is Random;
	/** checks to see if `value` is a Ray */
	Ray: (value: any) => value is Ray;
	/** checks to see if `value` is a Rect */
	Rect: (value: any) => value is Rect;
	/** checks to see if `value` is a Region3 */
	Region3: (value: any) => value is Region3;
	/** checks to see if `value` is a Region3int16 */
	Region3int16: (value: any) => value is Region3int16;
	/** checks to see if `value` is a TweenInfo */
	TweenInfo: (value: any) => value is TweenInfo;
	/** checks to see if `value` is a UDim */
	UDim: (value: any) => value is UDim;
	/** checks to see if `value` is a UDim2 */
	UDim2: (value: any) => value is UDim2;
	/** checks to see if `value` is a Vector2 */
	Vector2: (value: any) => value is Vector2;
	/** checks to see if `value` is a Vector3 */
	Vector3: (value: any) => value is Vector3;
	/** checks to see if `value` is a Vector3int16 */
	Vector3int16: (value: any) => value is Vector3int16;

	/** checks to see if `value == literalValue` */
	literal: <T>(literalValue: T) => (value: any) => value is T;
	/** checks to see if `value` is an integer */
	integer: (value: any) => value is number;
	/** checks to see if `value` is a number and is more than or equal to `min` */
	numberMin: (min: number) => (value: any) => value is number;
	/** checks to see if `value` is a number and is less than or equal to `max` */
	numberMax: (max: number) => (value: any) => value is number;
	/** checks to see if `value` is a number and is more than `min` */
	numberMinExclusive: (min: number) => (value: any) => value is number;
	/** checks to see if `value` is a number and is less than `max` */
	numberMaxExclusive: (max: number) => (value: any) => value is number;
	/** checks to see if `value` is a number and is more than 0 */
	numberPositive: (value: any) => value is number;
	/** checks to see if `value` is a number and is less than 0 */
	numberNegative: (value: any) => value is number;
	/** checks to see if `value` is a number and `min <= value <= max` */
	numberConstrained: (min: number, max: number) => (value: any) => value is number;
	/** checks to see if `value` is a number and `min < value < max` */
	numberConstrainedExclusive: (min: number, max: number) => (value: any) => value is number;
	/** checks to see if `value` is either nil or passes `check` */
	optional: <T>(check: (value: any) => value is T) => check<T | undefined>;
	/** checks to see if `value` is a table and if its keys match against `check */
	keys: <T>(check: (value: any) => value is T) => check<Map<T, unknown>>;
	/** checks to see if `value` is a table and if its values match against `check` */
	values: <T>(check: (value: any) => value is T) => check<Map<unknown, T>>;
	/** checks to see if `value` is a table and all of its keys match against `keyCheck` and all of its values match against `valueCheck` */
	map: <K, V>(keyCheck: (value: any) => value is K, valueCheck: (value: any) => value is V) => check<Map<K, V>>;
	/** checks to see if `value` is an array and all of its keys are sequential integers and all of its values match `check` */
	array: <T>(check: (value: any) => value is T) => check<Array<T>>;

	/** checks to see if `value` matches any given check */
	union: <T extends Array<any>>(
		...args: T
	) => T extends [check<infer A>]
		? (value: any) => value is A
		: T extends [check<infer A>, check<infer B>]
		? check<A | B>
		: T extends [check<infer A>, check<infer B>, check<infer C>]
		? check<A | B | C>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>]
		? check<A | B | C | D>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>, check<infer E>]
		? check<A | B | C | D | E>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>, check<infer E>, check<infer F>]
		? check<A | B | C | D | E | F>
		: never;

	/** checks to see if `value` matches all given checks */
	intersection: <T extends Array<any>>(
		...args: T
	) => T extends [check<infer A>]
		? (value: any) => value is A
		: T extends [check<infer A>, check<infer B>]
		? check<A & B>
		: T extends [check<infer A>, check<infer B>, check<infer C>]
		? check<A & B & C>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>]
		? check<A & B & C & D>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>, check<infer E>]
		? check<A & B & C & D & E>
		: T extends [check<infer A>, check<infer B>, check<infer C>, check<infer D>, check<infer E>, check<infer F>]
		? check<A & B & C & D & E & F>
		: never;

	/** checks to see if `value` matches a given interface definition */
	interface: <T extends { [index: string]: (value: any) => value is any }>(
		checkTable: T
	) => check<{ [P in keyof T]: t.static<T[P]> }>;

	/** checks to see if `value` matches a given interface definition with no extra members */
	strictInterface: <T extends { [index: string]: (value: any) => value is any }>(
		checkTable: T
	) => check<{ [P in keyof T]: t.static<T[P]> }>;
}

interface t {
	instance: <T extends string>(className: T) => T extends keyof Instances ? check<Instances[T]> : boolean;
	instanceIsA: <T extends string>(className: T) => T extends keyof Instances ? check<Instances[T]> : boolean;
}

declare namespace t {
	/** creates a static type from a t-defined type */
	export type static<T> = T extends check<infer U> ? U : never;
}

declare const t: t;
export = t;
