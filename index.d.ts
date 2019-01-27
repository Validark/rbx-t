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
	instance(className: "Instance"): check<Instance>;
	instanceIsA(className: "Instance"): check<Instance>;
	instance(className: "ABTestService"): check<ABTestService>;
	instanceIsA(className: "ABTestService"): check<ABTestService>;
	instance(className: "Accoutrement"): check<Accoutrement>;
	instanceIsA(className: "Accoutrement"): check<Accoutrement>;
	instance(className: "Accessory"): check<Accessory>;
	instanceIsA(className: "Accessory"): check<Accessory>;
	instance(className: "Hat"): check<Hat>;
	instanceIsA(className: "Hat"): check<Hat>;
	instance(className: "AdService"): check<AdService>;
	instanceIsA(className: "AdService"): check<AdService>;
	instance(className: "AdvancedDragger"): check<AdvancedDragger>;
	instanceIsA(className: "AdvancedDragger"): check<AdvancedDragger>;
	instance(className: "AnalyticsService"): check<AnalyticsService>;
	instanceIsA(className: "AnalyticsService"): check<AnalyticsService>;
	instance(className: "Animation"): check<Animation>;
	instanceIsA(className: "Animation"): check<Animation>;
	instance(className: "AnimationController"): check<AnimationController>;
	instanceIsA(className: "AnimationController"): check<AnimationController>;
	instance(className: "AnimationTrack"): check<AnimationTrack>;
	instanceIsA(className: "AnimationTrack"): check<AnimationTrack>;
	instance(className: "Animator"): check<Animator>;
	instanceIsA(className: "Animator"): check<Animator>;
	instance(className: "AssetService"): check<AssetService>;
	instanceIsA(className: "AssetService"): check<AssetService>;
	instance(className: "Attachment"): check<Attachment>;
	instanceIsA(className: "Attachment"): check<Attachment>;
	instance(className: "BadgeService"): check<BadgeService>;
	instanceIsA(className: "BadgeService"): check<BadgeService>;
	instance(className: "BasePlayerGui"): check<BasePlayerGui>;
	instanceIsA(className: "BasePlayerGui"): check<BasePlayerGui>;
	instance(className: "CoreGui"): check<CoreGui>;
	instanceIsA(className: "CoreGui"): check<CoreGui>;
	instance(className: "PlayerGui"): check<PlayerGui>;
	instanceIsA(className: "PlayerGui"): check<PlayerGui>;
	instance(className: "StarterGui"): check<StarterGui>;
	instanceIsA(className: "StarterGui"): check<StarterGui>;
	instance(className: "Beam"): check<Beam>;
	instanceIsA(className: "Beam"): check<Beam>;
	instance(className: "BindableEvent"): check<BindableEvent>;
	instanceIsA(className: "BindableEvent"): check<BindableEvent>;
	instance(className: "BindableFunction"): check<BindableFunction>;
	instanceIsA(className: "BindableFunction"): check<BindableFunction>;
	instance(className: "BodyMover"): check<BodyMover>;
	instanceIsA(className: "BodyMover"): check<BodyMover>;
	instance(className: "BodyAngularVelocity"): check<BodyAngularVelocity>;
	instanceIsA(className: "BodyAngularVelocity"): check<BodyAngularVelocity>;
	instance(className: "BodyForce"): check<BodyForce>;
	instanceIsA(className: "BodyForce"): check<BodyForce>;
	instance(className: "BodyGyro"): check<BodyGyro>;
	instanceIsA(className: "BodyGyro"): check<BodyGyro>;
	instance(className: "BodyPosition"): check<BodyPosition>;
	instanceIsA(className: "BodyPosition"): check<BodyPosition>;
	instance(className: "BodyThrust"): check<BodyThrust>;
	instanceIsA(className: "BodyThrust"): check<BodyThrust>;
	instance(className: "BodyVelocity"): check<BodyVelocity>;
	instanceIsA(className: "BodyVelocity"): check<BodyVelocity>;
	instance(className: "RocketPropulsion"): check<RocketPropulsion>;
	instanceIsA(className: "RocketPropulsion"): check<RocketPropulsion>;
	instance(className: "CacheableContentProvider"): check<CacheableContentProvider>;
	instanceIsA(className: "CacheableContentProvider"): check<CacheableContentProvider>;
	instance(className: "MeshContentProvider"): check<MeshContentProvider>;
	instanceIsA(className: "MeshContentProvider"): check<MeshContentProvider>;
	instance(className: "SolidModelContentProvider"): check<SolidModelContentProvider>;
	instanceIsA(className: "SolidModelContentProvider"): check<SolidModelContentProvider>;
	instance(className: "Camera"): check<Camera>;
	instanceIsA(className: "Camera"): check<Camera>;
	instance(className: "ChangeHistoryService"): check<ChangeHistoryService>;
	instanceIsA(className: "ChangeHistoryService"): check<ChangeHistoryService>;
	instance(className: "CharacterAppearance"): check<CharacterAppearance>;
	instanceIsA(className: "CharacterAppearance"): check<CharacterAppearance>;
	instance(className: "BodyColors"): check<BodyColors>;
	instanceIsA(className: "BodyColors"): check<BodyColors>;
	instance(className: "CharacterMesh"): check<CharacterMesh>;
	instanceIsA(className: "CharacterMesh"): check<CharacterMesh>;
	instance(className: "Clothing"): check<Clothing>;
	instanceIsA(className: "Clothing"): check<Clothing>;
	instance(className: "Pants"): check<Pants>;
	instanceIsA(className: "Pants"): check<Pants>;
	instance(className: "Shirt"): check<Shirt>;
	instanceIsA(className: "Shirt"): check<Shirt>;
	instance(className: "ShirtGraphic"): check<ShirtGraphic>;
	instanceIsA(className: "ShirtGraphic"): check<ShirtGraphic>;
	instance(className: "Skin"): check<Skin>;
	instanceIsA(className: "Skin"): check<Skin>;
	instance(className: "Chat"): check<Chat>;
	instanceIsA(className: "Chat"): check<Chat>;
	instance(className: "ClickDetector"): check<ClickDetector>;
	instanceIsA(className: "ClickDetector"): check<ClickDetector>;
	instance(className: "ClusterPacketCache"): check<ClusterPacketCache>;
	instanceIsA(className: "ClusterPacketCache"): check<ClusterPacketCache>;
	instance(className: "CollectionService"): check<CollectionService>;
	instanceIsA(className: "CollectionService"): check<CollectionService>;
	instance(className: "Configuration"): check<Configuration>;
	instanceIsA(className: "Configuration"): check<Configuration>;
	instance(className: "Constraint"): check<Constraint>;
	instanceIsA(className: "Constraint"): check<Constraint>;
	instance(className: "AlignOrientation"): check<AlignOrientation>;
	instanceIsA(className: "AlignOrientation"): check<AlignOrientation>;
	instance(className: "AlignPosition"): check<AlignPosition>;
	instanceIsA(className: "AlignPosition"): check<AlignPosition>;
	instance(className: "BallSocketConstraint"): check<BallSocketConstraint>;
	instanceIsA(className: "BallSocketConstraint"): check<BallSocketConstraint>;
	instance(className: "HingeConstraint"): check<HingeConstraint>;
	instanceIsA(className: "HingeConstraint"): check<HingeConstraint>;
	instance(className: "LineForce"): check<LineForce>;
	instanceIsA(className: "LineForce"): check<LineForce>;
	instance(className: "RodConstraint"): check<RodConstraint>;
	instanceIsA(className: "RodConstraint"): check<RodConstraint>;
	instance(className: "RopeConstraint"): check<RopeConstraint>;
	instanceIsA(className: "RopeConstraint"): check<RopeConstraint>;
	instance(className: "SlidingBallConstraint"): check<SlidingBallConstraint>;
	instanceIsA(className: "SlidingBallConstraint"): check<SlidingBallConstraint>;
	instance(className: "CylindricalConstraint"): check<CylindricalConstraint>;
	instanceIsA(className: "CylindricalConstraint"): check<CylindricalConstraint>;
	instance(className: "PrismaticConstraint"): check<PrismaticConstraint>;
	instanceIsA(className: "PrismaticConstraint"): check<PrismaticConstraint>;
	instance(className: "SpringConstraint"): check<SpringConstraint>;
	instanceIsA(className: "SpringConstraint"): check<SpringConstraint>;
	instance(className: "Torque"): check<Torque>;
	instanceIsA(className: "Torque"): check<Torque>;
	instance(className: "VectorForce"): check<VectorForce>;
	instanceIsA(className: "VectorForce"): check<VectorForce>;
	instance(className: "ContentProvider"): check<ContentProvider>;
	instanceIsA(className: "ContentProvider"): check<ContentProvider>;
	instance(className: "ContextActionService"): check<ContextActionService>;
	instanceIsA(className: "ContextActionService"): check<ContextActionService>;
	instance(className: "Controller"): check<Controller>;
	instanceIsA(className: "Controller"): check<Controller>;
	instance(className: "HumanoidController"): check<HumanoidController>;
	instanceIsA(className: "HumanoidController"): check<HumanoidController>;
	instance(className: "SkateboardController"): check<SkateboardController>;
	instanceIsA(className: "SkateboardController"): check<SkateboardController>;
	instance(className: "VehicleController"): check<VehicleController>;
	instanceIsA(className: "VehicleController"): check<VehicleController>;
	instance(className: "ControllerService"): check<ControllerService>;
	instanceIsA(className: "ControllerService"): check<ControllerService>;
	instance(className: "CookiesService"): check<CookiesService>;
	instanceIsA(className: "CookiesService"): check<CookiesService>;
	instance(className: "CorePackages"): check<CorePackages>;
	instanceIsA(className: "CorePackages"): check<CorePackages>;
	instance(className: "CoreScriptSyncService"): check<CoreScriptSyncService>;
	instanceIsA(className: "CoreScriptSyncService"): check<CoreScriptSyncService>;
	instance(className: "CustomEvent"): check<CustomEvent>;
	instanceIsA(className: "CustomEvent"): check<CustomEvent>;
	instance(className: "CustomEventReceiver"): check<CustomEventReceiver>;
	instanceIsA(className: "CustomEventReceiver"): check<CustomEventReceiver>;
	instance(className: "DataModelMesh"): check<DataModelMesh>;
	instanceIsA(className: "DataModelMesh"): check<DataModelMesh>;
	instance(className: "BevelMesh"): check<BevelMesh>;
	instanceIsA(className: "BevelMesh"): check<BevelMesh>;
	instance(className: "BlockMesh"): check<BlockMesh>;
	instanceIsA(className: "BlockMesh"): check<BlockMesh>;
	instance(className: "CylinderMesh"): check<CylinderMesh>;
	instanceIsA(className: "CylinderMesh"): check<CylinderMesh>;
	instance(className: "FileMesh"): check<FileMesh>;
	instanceIsA(className: "FileMesh"): check<FileMesh>;
	instance(className: "SpecialMesh"): check<SpecialMesh>;
	instanceIsA(className: "SpecialMesh"): check<SpecialMesh>;
	instance(className: "DataStoreService"): check<DataStoreService>;
	instanceIsA(className: "DataStoreService"): check<DataStoreService>;
	instance(className: "Debris"): check<Debris>;
	instanceIsA(className: "Debris"): check<Debris>;
	instance(className: "DebugSettings"): check<DebugSettings>;
	instanceIsA(className: "DebugSettings"): check<DebugSettings>;
	instance(className: "DebuggerBreakpoint"): check<DebuggerBreakpoint>;
	instanceIsA(className: "DebuggerBreakpoint"): check<DebuggerBreakpoint>;
	instance(className: "DebuggerManager"): check<DebuggerManager>;
	instanceIsA(className: "DebuggerManager"): check<DebuggerManager>;
	instance(className: "DebuggerWatch"): check<DebuggerWatch>;
	instanceIsA(className: "DebuggerWatch"): check<DebuggerWatch>;
	instance(className: "Dialog"): check<Dialog>;
	instanceIsA(className: "Dialog"): check<Dialog>;
	instance(className: "DialogChoice"): check<DialogChoice>;
	instanceIsA(className: "DialogChoice"): check<DialogChoice>;
	instance(className: "Dragger"): check<Dragger>;
	instanceIsA(className: "Dragger"): check<Dragger>;
	instance(className: "Explosion"): check<Explosion>;
	instanceIsA(className: "Explosion"): check<Explosion>;
	instance(className: "FaceInstance"): check<FaceInstance>;
	instanceIsA(className: "FaceInstance"): check<FaceInstance>;
	instance(className: "Decal"): check<Decal>;
	instanceIsA(className: "Decal"): check<Decal>;
	instance(className: "Texture"): check<Texture>;
	instanceIsA(className: "Texture"): check<Texture>;
	instance(className: "Feature"): check<Feature>;
	instanceIsA(className: "Feature"): check<Feature>;
	instance(className: "Hole"): check<Hole>;
	instanceIsA(className: "Hole"): check<Hole>;
	instance(className: "MotorFeature"): check<MotorFeature>;
	instanceIsA(className: "MotorFeature"): check<MotorFeature>;
	instance(className: "Fire"): check<Fire>;
	instanceIsA(className: "Fire"): check<Fire>;
	instance(className: "FlagStandService"): check<FlagStandService>;
	instanceIsA(className: "FlagStandService"): check<FlagStandService>;
	instance(className: "FlyweightService"): check<FlyweightService>;
	instanceIsA(className: "FlyweightService"): check<FlyweightService>;
	instance(className: "CSGDictionaryService"): check<CSGDictionaryService>;
	instanceIsA(className: "CSGDictionaryService"): check<CSGDictionaryService>;
	instance(className: "NonReplicatedCSGDictionaryService"): check<NonReplicatedCSGDictionaryService>;
	instanceIsA(className: "NonReplicatedCSGDictionaryService"): check<NonReplicatedCSGDictionaryService>;
	instance(className: "Folder"): check<Folder>;
	instanceIsA(className: "Folder"): check<Folder>;
	instance(className: "ForceField"): check<ForceField>;
	instanceIsA(className: "ForceField"): check<ForceField>;
	instance(className: "FriendService"): check<FriendService>;
	instanceIsA(className: "FriendService"): check<FriendService>;
	instance(className: "FunctionalTest"): check<FunctionalTest>;
	instanceIsA(className: "FunctionalTest"): check<FunctionalTest>;
	instance(className: "GamePassService"): check<GamePassService>;
	instanceIsA(className: "GamePassService"): check<GamePassService>;
	instance(className: "GameSettings"): check<GameSettings>;
	instanceIsA(className: "GameSettings"): check<GameSettings>;
	instance(className: "GamepadService"): check<GamepadService>;
	instanceIsA(className: "GamepadService"): check<GamepadService>;
	instance(className: "Geometry"): check<Geometry>;
	instanceIsA(className: "Geometry"): check<Geometry>;
	instance(className: "GlobalDataStore"): check<GlobalDataStore>;
	instanceIsA(className: "GlobalDataStore"): check<GlobalDataStore>;
	instance(className: "OrderedDataStore"): check<OrderedDataStore>;
	instanceIsA(className: "OrderedDataStore"): check<OrderedDataStore>;
	instance(className: "GoogleAnalyticsConfiguration"): check<GoogleAnalyticsConfiguration>;
	instanceIsA(className: "GoogleAnalyticsConfiguration"): check<GoogleAnalyticsConfiguration>;
	instance(className: "GroupService"): check<GroupService>;
	instanceIsA(className: "GroupService"): check<GroupService>;
	instance(className: "GuiBase"): check<GuiBase>;
	instanceIsA(className: "GuiBase"): check<GuiBase>;
	instance(className: "GuiBase2d"): check<GuiBase2d>;
	instanceIsA(className: "GuiBase2d"): check<GuiBase2d>;
	instance(className: "GuiObject"): check<GuiObject>;
	instanceIsA(className: "GuiObject"): check<GuiObject>;
	instance(className: "Frame"): check<Frame>;
	instanceIsA(className: "Frame"): check<Frame>;
	instance(className: "GuiButton"): check<GuiButton>;
	instanceIsA(className: "GuiButton"): check<GuiButton>;
	instance(className: "ImageButton"): check<ImageButton>;
	instanceIsA(className: "ImageButton"): check<ImageButton>;
	instance(className: "TextButton"): check<TextButton>;
	instanceIsA(className: "TextButton"): check<TextButton>;
	instance(className: "GuiLabel"): check<GuiLabel>;
	instanceIsA(className: "GuiLabel"): check<GuiLabel>;
	instance(className: "ImageLabel"): check<ImageLabel>;
	instanceIsA(className: "ImageLabel"): check<ImageLabel>;
	instance(className: "TextLabel"): check<TextLabel>;
	instanceIsA(className: "TextLabel"): check<TextLabel>;
	instance(className: "ScrollingFrame"): check<ScrollingFrame>;
	instanceIsA(className: "ScrollingFrame"): check<ScrollingFrame>;
	instance(className: "TextBox"): check<TextBox>;
	instanceIsA(className: "TextBox"): check<TextBox>;
	instance(className: "ViewportFrame"): check<ViewportFrame>;
	instanceIsA(className: "ViewportFrame"): check<ViewportFrame>;
	instance(className: "LayerCollector"): check<LayerCollector>;
	instanceIsA(className: "LayerCollector"): check<LayerCollector>;
	instance(className: "BillboardGui"): check<BillboardGui>;
	instanceIsA(className: "BillboardGui"): check<BillboardGui>;
	instance(className: "PluginGui"): check<PluginGui>;
	instanceIsA(className: "PluginGui"): check<PluginGui>;
	instance(className: "DockWidgetPluginGui"): check<DockWidgetPluginGui>;
	instanceIsA(className: "DockWidgetPluginGui"): check<DockWidgetPluginGui>;
	instance(className: "QWidgetPluginGui"): check<QWidgetPluginGui>;
	instanceIsA(className: "QWidgetPluginGui"): check<QWidgetPluginGui>;
	instance(className: "ScreenGui"): check<ScreenGui>;
	instanceIsA(className: "ScreenGui"): check<ScreenGui>;
	instance(className: "GuiMain"): check<GuiMain>;
	instanceIsA(className: "GuiMain"): check<GuiMain>;
	instance(className: "SurfaceGui"): check<SurfaceGui>;
	instanceIsA(className: "SurfaceGui"): check<SurfaceGui>;
	instance(className: "GuiBase3d"): check<GuiBase3d>;
	instanceIsA(className: "GuiBase3d"): check<GuiBase3d>;
	instance(className: "FloorWire"): check<FloorWire>;
	instanceIsA(className: "FloorWire"): check<FloorWire>;
	instance(className: "PVAdornment"): check<PVAdornment>;
	instanceIsA(className: "PVAdornment"): check<PVAdornment>;
	instance(className: "HandleAdornment"): check<HandleAdornment>;
	instanceIsA(className: "HandleAdornment"): check<HandleAdornment>;
	instance(className: "BoxHandleAdornment"): check<BoxHandleAdornment>;
	instanceIsA(className: "BoxHandleAdornment"): check<BoxHandleAdornment>;
	instance(className: "ConeHandleAdornment"): check<ConeHandleAdornment>;
	instanceIsA(className: "ConeHandleAdornment"): check<ConeHandleAdornment>;
	instance(className: "CylinderHandleAdornment"): check<CylinderHandleAdornment>;
	instanceIsA(className: "CylinderHandleAdornment"): check<CylinderHandleAdornment>;
	instance(className: "ImageHandleAdornment"): check<ImageHandleAdornment>;
	instanceIsA(className: "ImageHandleAdornment"): check<ImageHandleAdornment>;
	instance(className: "LineHandleAdornment"): check<LineHandleAdornment>;
	instanceIsA(className: "LineHandleAdornment"): check<LineHandleAdornment>;
	instance(className: "SphereHandleAdornment"): check<SphereHandleAdornment>;
	instanceIsA(className: "SphereHandleAdornment"): check<SphereHandleAdornment>;
	instance(className: "ParabolaAdornment"): check<ParabolaAdornment>;
	instanceIsA(className: "ParabolaAdornment"): check<ParabolaAdornment>;
	instance(className: "SelectionBox"): check<SelectionBox>;
	instanceIsA(className: "SelectionBox"): check<SelectionBox>;
	instance(className: "SelectionSphere"): check<SelectionSphere>;
	instanceIsA(className: "SelectionSphere"): check<SelectionSphere>;
	instance(className: "PartAdornment"): check<PartAdornment>;
	instanceIsA(className: "PartAdornment"): check<PartAdornment>;
	instance(className: "HandlesBase"): check<HandlesBase>;
	instanceIsA(className: "HandlesBase"): check<HandlesBase>;
	instance(className: "ArcHandles"): check<ArcHandles>;
	instanceIsA(className: "ArcHandles"): check<ArcHandles>;
	instance(className: "Handles"): check<Handles>;
	instanceIsA(className: "Handles"): check<Handles>;
	instance(className: "SurfaceSelection"): check<SurfaceSelection>;
	instanceIsA(className: "SurfaceSelection"): check<SurfaceSelection>;
	instance(className: "SelectionLasso"): check<SelectionLasso>;
	instanceIsA(className: "SelectionLasso"): check<SelectionLasso>;
	instance(className: "SelectionPartLasso"): check<SelectionPartLasso>;
	instanceIsA(className: "SelectionPartLasso"): check<SelectionPartLasso>;
	instance(className: "SelectionPointLasso"): check<SelectionPointLasso>;
	instanceIsA(className: "SelectionPointLasso"): check<SelectionPointLasso>;
	instance(className: "GuiItem"): check<GuiItem>;
	instanceIsA(className: "GuiItem"): check<GuiItem>;
	instance(className: "Backpack"): check<Backpack>;
	instanceIsA(className: "Backpack"): check<Backpack>;
	instance(className: "BackpackItem"): check<BackpackItem>;
	instanceIsA(className: "BackpackItem"): check<BackpackItem>;
	instance(className: "HopperBin"): check<HopperBin>;
	instanceIsA(className: "HopperBin"): check<HopperBin>;
	instance(className: "Tool"): check<Tool>;
	instanceIsA(className: "Tool"): check<Tool>;
	instance(className: "Flag"): check<Flag>;
	instanceIsA(className: "Flag"): check<Flag>;
	instance(className: "ButtonBindingWidget"): check<ButtonBindingWidget>;
	instanceIsA(className: "ButtonBindingWidget"): check<ButtonBindingWidget>;
	instance(className: "GuiRoot"): check<GuiRoot>;
	instanceIsA(className: "GuiRoot"): check<GuiRoot>;
	instance(className: "Hopper"): check<Hopper>;
	instanceIsA(className: "Hopper"): check<Hopper>;
	instance(className: "StarterPack"): check<StarterPack>;
	instanceIsA(className: "StarterPack"): check<StarterPack>;
	instance(className: "GuiService"): check<GuiService>;
	instanceIsA(className: "GuiService"): check<GuiService>;
	instance(className: "GuidRegistryService"): check<GuidRegistryService>;
	instanceIsA(className: "GuidRegistryService"): check<GuidRegistryService>;
	instance(className: "HapticService"): check<HapticService>;
	instanceIsA(className: "HapticService"): check<HapticService>;
	instance(className: "HttpRbxApiService"): check<HttpRbxApiService>;
	instanceIsA(className: "HttpRbxApiService"): check<HttpRbxApiService>;
	instance(className: "HttpRequest"): check<HttpRequest>;
	instanceIsA(className: "HttpRequest"): check<HttpRequest>;
	instance(className: "HttpService"): check<HttpService>;
	instanceIsA(className: "HttpService"): check<HttpService>;
	instance(className: "Humanoid"): check<Humanoid>;
	instanceIsA(className: "Humanoid"): check<Humanoid>;
	instance(className: "HumanoidDescription"): check<HumanoidDescription>;
	instanceIsA(className: "HumanoidDescription"): check<HumanoidDescription>;
	instance(className: "InputObject"): check<InputObject>;
	instanceIsA(className: "InputObject"): check<InputObject>;
	instance(className: "InsertService"): check<InsertService>;
	instanceIsA(className: "InsertService"): check<InsertService>;
	instance(className: "JointInstance"): check<JointInstance>;
	instanceIsA(className: "JointInstance"): check<JointInstance>;
	instance(className: "DynamicRotate"): check<DynamicRotate>;
	instanceIsA(className: "DynamicRotate"): check<DynamicRotate>;
	instance(className: "RotateP"): check<RotateP>;
	instanceIsA(className: "RotateP"): check<RotateP>;
	instance(className: "RotateV"): check<RotateV>;
	instanceIsA(className: "RotateV"): check<RotateV>;
	instance(className: "Glue"): check<Glue>;
	instanceIsA(className: "Glue"): check<Glue>;
	instance(className: "ManualSurfaceJointInstance"): check<ManualSurfaceJointInstance>;
	instanceIsA(className: "ManualSurfaceJointInstance"): check<ManualSurfaceJointInstance>;
	instance(className: "ManualGlue"): check<ManualGlue>;
	instanceIsA(className: "ManualGlue"): check<ManualGlue>;
	instance(className: "ManualWeld"): check<ManualWeld>;
	instanceIsA(className: "ManualWeld"): check<ManualWeld>;
	instance(className: "Motor"): check<Motor>;
	instanceIsA(className: "Motor"): check<Motor>;
	instance(className: "Motor6D"): check<Motor6D>;
	instanceIsA(className: "Motor6D"): check<Motor6D>;
	instance(className: "Rotate"): check<Rotate>;
	instanceIsA(className: "Rotate"): check<Rotate>;
	instance(className: "Snap"): check<Snap>;
	instanceIsA(className: "Snap"): check<Snap>;
	instance(className: "VelocityMotor"): check<VelocityMotor>;
	instanceIsA(className: "VelocityMotor"): check<VelocityMotor>;
	instance(className: "Weld"): check<Weld>;
	instanceIsA(className: "Weld"): check<Weld>;
	instance(className: "JointsService"): check<JointsService>;
	instanceIsA(className: "JointsService"): check<JointsService>;
	instance(className: "KeyboardService"): check<KeyboardService>;
	instanceIsA(className: "KeyboardService"): check<KeyboardService>;
	instance(className: "Keyframe"): check<Keyframe>;
	instanceIsA(className: "Keyframe"): check<Keyframe>;
	instance(className: "KeyframeSequence"): check<KeyframeSequence>;
	instanceIsA(className: "KeyframeSequence"): check<KeyframeSequence>;
	instance(className: "KeyframeSequenceProvider"): check<KeyframeSequenceProvider>;
	instanceIsA(className: "KeyframeSequenceProvider"): check<KeyframeSequenceProvider>;
	instance(className: "Light"): check<Light>;
	instanceIsA(className: "Light"): check<Light>;
	instance(className: "PointLight"): check<PointLight>;
	instanceIsA(className: "PointLight"): check<PointLight>;
	instance(className: "SpotLight"): check<SpotLight>;
	instanceIsA(className: "SpotLight"): check<SpotLight>;
	instance(className: "SurfaceLight"): check<SurfaceLight>;
	instanceIsA(className: "SurfaceLight"): check<SurfaceLight>;
	instance(className: "Lighting"): check<Lighting>;
	instanceIsA(className: "Lighting"): check<Lighting>;
	instance(className: "LocalizationService"): check<LocalizationService>;
	instanceIsA(className: "LocalizationService"): check<LocalizationService>;
	instance(className: "LocalizationTable"): check<LocalizationTable>;
	instanceIsA(className: "LocalizationTable"): check<LocalizationTable>;
	instance(className: "LogService"): check<LogService>;
	instanceIsA(className: "LogService"): check<LogService>;
	instance(className: "LoginService"): check<LoginService>;
	instanceIsA(className: "LoginService"): check<LoginService>;
	instance(className: "LuaSettings"): check<LuaSettings>;
	instanceIsA(className: "LuaSettings"): check<LuaSettings>;
	instance(className: "LuaSourceContainer"): check<LuaSourceContainer>;
	instanceIsA(className: "LuaSourceContainer"): check<LuaSourceContainer>;
	instance(className: "BaseScript"): check<BaseScript>;
	instanceIsA(className: "BaseScript"): check<BaseScript>;
	instance(className: "CoreScript"): check<CoreScript>;
	instanceIsA(className: "CoreScript"): check<CoreScript>;
	instance(className: "Script"): check<Script>;
	instanceIsA(className: "Script"): check<Script>;
	instance(className: "LocalScript"): check<LocalScript>;
	instanceIsA(className: "LocalScript"): check<LocalScript>;
	instance(className: "ModuleScript"): check<ModuleScript>;
	instanceIsA(className: "ModuleScript"): check<ModuleScript>;
	instance(className: "LuaWebService"): check<LuaWebService>;
	instanceIsA(className: "LuaWebService"): check<LuaWebService>;
	instance(className: "MarketplaceService"): check<MarketplaceService>;
	instanceIsA(className: "MarketplaceService"): check<MarketplaceService>;
	instance(className: "Message"): check<Message>;
	instanceIsA(className: "Message"): check<Message>;
	instance(className: "Hint"): check<Hint>;
	instanceIsA(className: "Hint"): check<Hint>;
	instance(className: "Mouse"): check<Mouse>;
	instanceIsA(className: "Mouse"): check<Mouse>;
	instance(className: "PlayerMouse"): check<PlayerMouse>;
	instanceIsA(className: "PlayerMouse"): check<PlayerMouse>;
	instance(className: "PluginMouse"): check<PluginMouse>;
	instanceIsA(className: "PluginMouse"): check<PluginMouse>;
	instance(className: "MouseService"): check<MouseService>;
	instanceIsA(className: "MouseService"): check<MouseService>;
	instance(className: "NetworkMarker"): check<NetworkMarker>;
	instanceIsA(className: "NetworkMarker"): check<NetworkMarker>;
	instance(className: "NetworkPeer"): check<NetworkPeer>;
	instanceIsA(className: "NetworkPeer"): check<NetworkPeer>;
	instance(className: "NetworkClient"): check<NetworkClient>;
	instanceIsA(className: "NetworkClient"): check<NetworkClient>;
	instance(className: "NetworkServer"): check<NetworkServer>;
	instanceIsA(className: "NetworkServer"): check<NetworkServer>;
	instance(className: "NetworkReplicator"): check<NetworkReplicator>;
	instanceIsA(className: "NetworkReplicator"): check<NetworkReplicator>;
	instance(className: "ClientReplicator"): check<ClientReplicator>;
	instanceIsA(className: "ClientReplicator"): check<ClientReplicator>;
	instance(className: "ServerReplicator"): check<ServerReplicator>;
	instanceIsA(className: "ServerReplicator"): check<ServerReplicator>;
	instance(className: "NetworkSettings"): check<NetworkSettings>;
	instanceIsA(className: "NetworkSettings"): check<NetworkSettings>;
	instance(className: "NotificationService"): check<NotificationService>;
	instanceIsA(className: "NotificationService"): check<NotificationService>;
	instance(className: "PVInstance"): check<PVInstance>;
	instanceIsA(className: "PVInstance"): check<PVInstance>;
	instance(className: "BasePart"): check<BasePart>;
	instanceIsA(className: "BasePart"): check<BasePart>;
	instance(className: "CornerWedgePart"): check<CornerWedgePart>;
	instanceIsA(className: "CornerWedgePart"): check<CornerWedgePart>;
	instance(className: "FormFactorPart"): check<FormFactorPart>;
	instanceIsA(className: "FormFactorPart"): check<FormFactorPart>;
	instance(className: "Part"): check<Part>;
	instanceIsA(className: "Part"): check<Part>;
	instance(className: "FlagStand"): check<FlagStand>;
	instanceIsA(className: "FlagStand"): check<FlagStand>;
	instance(className: "Platform"): check<Platform>;
	instanceIsA(className: "Platform"): check<Platform>;
	instance(className: "Seat"): check<Seat>;
	instanceIsA(className: "Seat"): check<Seat>;
	instance(className: "SkateboardPlatform"): check<SkateboardPlatform>;
	instanceIsA(className: "SkateboardPlatform"): check<SkateboardPlatform>;
	instance(className: "SpawnLocation"): check<SpawnLocation>;
	instanceIsA(className: "SpawnLocation"): check<SpawnLocation>;
	instance(className: "WedgePart"): check<WedgePart>;
	instanceIsA(className: "WedgePart"): check<WedgePart>;
	instance(className: "MeshPart"): check<MeshPart>;
	instanceIsA(className: "MeshPart"): check<MeshPart>;
	instance(className: "PartOperation"): check<PartOperation>;
	instanceIsA(className: "PartOperation"): check<PartOperation>;
	instance(className: "NegateOperation"): check<NegateOperation>;
	instanceIsA(className: "NegateOperation"): check<NegateOperation>;
	instance(className: "UnionOperation"): check<UnionOperation>;
	instanceIsA(className: "UnionOperation"): check<UnionOperation>;
	instance(className: "Terrain"): check<Terrain>;
	instanceIsA(className: "Terrain"): check<Terrain>;
	instance(className: "TrussPart"): check<TrussPart>;
	instanceIsA(className: "TrussPart"): check<TrussPart>;
	instance(className: "VehicleSeat"): check<VehicleSeat>;
	instanceIsA(className: "VehicleSeat"): check<VehicleSeat>;
	instance(className: "Model"): check<Model>;
	instanceIsA(className: "Model"): check<Model>;
	instance(className: "Status"): check<Status>;
	instanceIsA(className: "Status"): check<Status>;
	instance(className: "Workspace"): check<Workspace>;
	instanceIsA(className: "Workspace"): check<Workspace>;
	instance(className: "PackageLink"): check<PackageLink>;
	instanceIsA(className: "PackageLink"): check<PackageLink>;
	instance(className: "Pages"): check<Pages>;
	instanceIsA(className: "Pages"): check<Pages>;
	instance(className: "DataStorePages"): check<DataStorePages>;
	instanceIsA(className: "DataStorePages"): check<DataStorePages>;
	instance(className: "FriendPages"): check<FriendPages>;
	instanceIsA(className: "FriendPages"): check<FriendPages>;
	instance(className: "InventoryPages"): check<InventoryPages>;
	instanceIsA(className: "InventoryPages"): check<InventoryPages>;
	instance(className: "StandardPages"): check<StandardPages>;
	instanceIsA(className: "StandardPages"): check<StandardPages>;
	instance(className: "PartOperationAsset"): check<PartOperationAsset>;
	instanceIsA(className: "PartOperationAsset"): check<PartOperationAsset>;
	instance(className: "ParticleEmitter"): check<ParticleEmitter>;
	instanceIsA(className: "ParticleEmitter"): check<ParticleEmitter>;
	instance(className: "Path"): check<Path>;
	instanceIsA(className: "Path"): check<Path>;
	instance(className: "PathfindingService"): check<PathfindingService>;
	instanceIsA(className: "PathfindingService"): check<PathfindingService>;
	instance(className: "PhysicsPacketCache"): check<PhysicsPacketCache>;
	instanceIsA(className: "PhysicsPacketCache"): check<PhysicsPacketCache>;
	instance(className: "PhysicsService"): check<PhysicsService>;
	instanceIsA(className: "PhysicsService"): check<PhysicsService>;
	instance(className: "PhysicsSettings"): check<PhysicsSettings>;
	instanceIsA(className: "PhysicsSettings"): check<PhysicsSettings>;
	instance(className: "Player"): check<Player>;
	instanceIsA(className: "Player"): check<Player>;
	instance(className: "PlayerScripts"): check<PlayerScripts>;
	instanceIsA(className: "PlayerScripts"): check<PlayerScripts>;
	instance(className: "Players"): check<Players>;
	instanceIsA(className: "Players"): check<Players>;
	instance(className: "Plugin"): check<Plugin>;
	instanceIsA(className: "Plugin"): check<Plugin>;
	instance(className: "PluginAction"): check<PluginAction>;
	instanceIsA(className: "PluginAction"): check<PluginAction>;
	instance(className: "PluginDragEvent"): check<PluginDragEvent>;
	instanceIsA(className: "PluginDragEvent"): check<PluginDragEvent>;
	instance(className: "PluginGuiService"): check<PluginGuiService>;
	instanceIsA(className: "PluginGuiService"): check<PluginGuiService>;
	instance(className: "PluginManager"): check<PluginManager>;
	instanceIsA(className: "PluginManager"): check<PluginManager>;
	instance(className: "PluginMenu"): check<PluginMenu>;
	instanceIsA(className: "PluginMenu"): check<PluginMenu>;
	instance(className: "PointsService"): check<PointsService>;
	instanceIsA(className: "PointsService"): check<PointsService>;
	instance(className: "Pose"): check<Pose>;
	instanceIsA(className: "Pose"): check<Pose>;
	instance(className: "PostEffect"): check<PostEffect>;
	instanceIsA(className: "PostEffect"): check<PostEffect>;
	instance(className: "BloomEffect"): check<BloomEffect>;
	instanceIsA(className: "BloomEffect"): check<BloomEffect>;
	instance(className: "BlurEffect"): check<BlurEffect>;
	instanceIsA(className: "BlurEffect"): check<BlurEffect>;
	instance(className: "ColorCorrectionEffect"): check<ColorCorrectionEffect>;
	instanceIsA(className: "ColorCorrectionEffect"): check<ColorCorrectionEffect>;
	instance(className: "SunRaysEffect"): check<SunRaysEffect>;
	instanceIsA(className: "SunRaysEffect"): check<SunRaysEffect>;
	instance(className: "ReflectionMetadata"): check<ReflectionMetadata>;
	instanceIsA(className: "ReflectionMetadata"): check<ReflectionMetadata>;
	instance(className: "ReflectionMetadataCallbacks"): check<ReflectionMetadataCallbacks>;
	instanceIsA(className: "ReflectionMetadataCallbacks"): check<ReflectionMetadataCallbacks>;
	instance(className: "ReflectionMetadataClasses"): check<ReflectionMetadataClasses>;
	instanceIsA(className: "ReflectionMetadataClasses"): check<ReflectionMetadataClasses>;
	instance(className: "ReflectionMetadataEnums"): check<ReflectionMetadataEnums>;
	instanceIsA(className: "ReflectionMetadataEnums"): check<ReflectionMetadataEnums>;
	instance(className: "ReflectionMetadataEvents"): check<ReflectionMetadataEvents>;
	instanceIsA(className: "ReflectionMetadataEvents"): check<ReflectionMetadataEvents>;
	instance(className: "ReflectionMetadataFunctions"): check<ReflectionMetadataFunctions>;
	instanceIsA(className: "ReflectionMetadataFunctions"): check<ReflectionMetadataFunctions>;
	instance(className: "ReflectionMetadataItem"): check<ReflectionMetadataItem>;
	instanceIsA(className: "ReflectionMetadataItem"): check<ReflectionMetadataItem>;
	instance(className: "ReflectionMetadataClass"): check<ReflectionMetadataClass>;
	instanceIsA(className: "ReflectionMetadataClass"): check<ReflectionMetadataClass>;
	instance(className: "ReflectionMetadataEnum"): check<ReflectionMetadataEnum>;
	instanceIsA(className: "ReflectionMetadataEnum"): check<ReflectionMetadataEnum>;
	instance(className: "ReflectionMetadataEnumItem"): check<ReflectionMetadataEnumItem>;
	instanceIsA(className: "ReflectionMetadataEnumItem"): check<ReflectionMetadataEnumItem>;
	instance(className: "ReflectionMetadataMember"): check<ReflectionMetadataMember>;
	instanceIsA(className: "ReflectionMetadataMember"): check<ReflectionMetadataMember>;
	instance(className: "ReflectionMetadataProperties"): check<ReflectionMetadataProperties>;
	instanceIsA(className: "ReflectionMetadataProperties"): check<ReflectionMetadataProperties>;
	instance(className: "ReflectionMetadataYieldFunctions"): check<ReflectionMetadataYieldFunctions>;
	instanceIsA(className: "ReflectionMetadataYieldFunctions"): check<ReflectionMetadataYieldFunctions>;
	instance(className: "RemoteEvent"): check<RemoteEvent>;
	instanceIsA(className: "RemoteEvent"): check<RemoteEvent>;
	instance(className: "RemoteFunction"): check<RemoteFunction>;
	instanceIsA(className: "RemoteFunction"): check<RemoteFunction>;
	instance(className: "RenderSettings"): check<RenderSettings>;
	instanceIsA(className: "RenderSettings"): check<RenderSettings>;
	instance(className: "RenderingTest"): check<RenderingTest>;
	instanceIsA(className: "RenderingTest"): check<RenderingTest>;
	instance(className: "ReplicatedFirst"): check<ReplicatedFirst>;
	instanceIsA(className: "ReplicatedFirst"): check<ReplicatedFirst>;
	instance(className: "ReplicatedStorage"): check<ReplicatedStorage>;
	instanceIsA(className: "ReplicatedStorage"): check<ReplicatedStorage>;
	instance(className: "RobloxReplicatedStorage"): check<RobloxReplicatedStorage>;
	instanceIsA(className: "RobloxReplicatedStorage"): check<RobloxReplicatedStorage>;
	instance(className: "RunService"): check<RunService>;
	instanceIsA(className: "RunService"): check<RunService>;
	instance(className: "RuntimeScriptService"): check<RuntimeScriptService>;
	instanceIsA(className: "RuntimeScriptService"): check<RuntimeScriptService>;
	instance(className: "ScriptContext"): check<ScriptContext>;
	instanceIsA(className: "ScriptContext"): check<ScriptContext>;
	instance(className: "ScriptDebugger"): check<ScriptDebugger>;
	instanceIsA(className: "ScriptDebugger"): check<ScriptDebugger>;
	instance(className: "ScriptService"): check<ScriptService>;
	instanceIsA(className: "ScriptService"): check<ScriptService>;
	instance(className: "Selection"): check<Selection>;
	instanceIsA(className: "Selection"): check<Selection>;
	instance(className: "ServerScriptService"): check<ServerScriptService>;
	instanceIsA(className: "ServerScriptService"): check<ServerScriptService>;
	instance(className: "ServerStorage"): check<ServerStorage>;
	instanceIsA(className: "ServerStorage"): check<ServerStorage>;
	instance(className: "ServiceProvider"): check<ServiceProvider>;
	instanceIsA(className: "ServiceProvider"): check<ServiceProvider>;
	instance(className: "DataModel"): check<DataModel>;
	instanceIsA(className: "DataModel"): check<DataModel>;
	instance(className: "GenericSettings"): check<GenericSettings>;
	instanceIsA(className: "GenericSettings"): check<GenericSettings>;
	instance(className: "AnalysticsSettings"): check<AnalysticsSettings>;
	instanceIsA(className: "AnalysticsSettings"): check<AnalysticsSettings>;
	instance(className: "GlobalSettings"): check<GlobalSettings>;
	instanceIsA(className: "GlobalSettings"): check<GlobalSettings>;
	instance(className: "UserSettings"): check<UserSettings>;
	instanceIsA(className: "UserSettings"): check<UserSettings>;
	instance(className: "Sky"): check<Sky>;
	instanceIsA(className: "Sky"): check<Sky>;
	instance(className: "Smoke"): check<Smoke>;
	instanceIsA(className: "Smoke"): check<Smoke>;
	instance(className: "Sound"): check<Sound>;
	instanceIsA(className: "Sound"): check<Sound>;
	instance(className: "SoundEffect"): check<SoundEffect>;
	instanceIsA(className: "SoundEffect"): check<SoundEffect>;
	instance(className: "ChorusSoundEffect"): check<ChorusSoundEffect>;
	instanceIsA(className: "ChorusSoundEffect"): check<ChorusSoundEffect>;
	instance(className: "CompressorSoundEffect"): check<CompressorSoundEffect>;
	instanceIsA(className: "CompressorSoundEffect"): check<CompressorSoundEffect>;
	instance(className: "DistortionSoundEffect"): check<DistortionSoundEffect>;
	instanceIsA(className: "DistortionSoundEffect"): check<DistortionSoundEffect>;
	instance(className: "EchoSoundEffect"): check<EchoSoundEffect>;
	instanceIsA(className: "EchoSoundEffect"): check<EchoSoundEffect>;
	instance(className: "EqualizerSoundEffect"): check<EqualizerSoundEffect>;
	instanceIsA(className: "EqualizerSoundEffect"): check<EqualizerSoundEffect>;
	instance(className: "FlangeSoundEffect"): check<FlangeSoundEffect>;
	instanceIsA(className: "FlangeSoundEffect"): check<FlangeSoundEffect>;
	instance(className: "PitchShiftSoundEffect"): check<PitchShiftSoundEffect>;
	instanceIsA(className: "PitchShiftSoundEffect"): check<PitchShiftSoundEffect>;
	instance(className: "ReverbSoundEffect"): check<ReverbSoundEffect>;
	instanceIsA(className: "ReverbSoundEffect"): check<ReverbSoundEffect>;
	instance(className: "TremoloSoundEffect"): check<TremoloSoundEffect>;
	instanceIsA(className: "TremoloSoundEffect"): check<TremoloSoundEffect>;
	instance(className: "SoundGroup"): check<SoundGroup>;
	instanceIsA(className: "SoundGroup"): check<SoundGroup>;
	instance(className: "SoundService"): check<SoundService>;
	instanceIsA(className: "SoundService"): check<SoundService>;
	instance(className: "Sparkles"): check<Sparkles>;
	instanceIsA(className: "Sparkles"): check<Sparkles>;
	instance(className: "SpawnerService"): check<SpawnerService>;
	instanceIsA(className: "SpawnerService"): check<SpawnerService>;
	instance(className: "StarterGear"): check<StarterGear>;
	instanceIsA(className: "StarterGear"): check<StarterGear>;
	instance(className: "StarterPlayer"): check<StarterPlayer>;
	instanceIsA(className: "StarterPlayer"): check<StarterPlayer>;
	instance(className: "StarterPlayerScripts"): check<StarterPlayerScripts>;
	instanceIsA(className: "StarterPlayerScripts"): check<StarterPlayerScripts>;
	instance(className: "StarterCharacterScripts"): check<StarterCharacterScripts>;
	instanceIsA(className: "StarterCharacterScripts"): check<StarterCharacterScripts>;
	instance(className: "Stats"): check<Stats>;
	instanceIsA(className: "Stats"): check<Stats>;
	instance(className: "StatsItem"): check<StatsItem>;
	instanceIsA(className: "StatsItem"): check<StatsItem>;
	instance(className: "RunningAverageItemDouble"): check<RunningAverageItemDouble>;
	instanceIsA(className: "RunningAverageItemDouble"): check<RunningAverageItemDouble>;
	instance(className: "RunningAverageItemInt"): check<RunningAverageItemInt>;
	instanceIsA(className: "RunningAverageItemInt"): check<RunningAverageItemInt>;
	instance(className: "RunningAverageTimeIntervalItem"): check<RunningAverageTimeIntervalItem>;
	instanceIsA(className: "RunningAverageTimeIntervalItem"): check<RunningAverageTimeIntervalItem>;
	instance(className: "TotalCountTimeIntervalItem"): check<TotalCountTimeIntervalItem>;
	instanceIsA(className: "TotalCountTimeIntervalItem"): check<TotalCountTimeIntervalItem>;
	instance(className: "StopWatchReporter"): check<StopWatchReporter>;
	instanceIsA(className: "StopWatchReporter"): check<StopWatchReporter>;
	instance(className: "Studio"): check<Studio>;
	instanceIsA(className: "Studio"): check<Studio>;
	instance(className: "StudioService"): check<StudioService>;
	instanceIsA(className: "StudioService"): check<StudioService>;
	instance(className: "StudioTheme"): check<StudioTheme>;
	instanceIsA(className: "StudioTheme"): check<StudioTheme>;
	instance(className: "TaskScheduler"): check<TaskScheduler>;
	instanceIsA(className: "TaskScheduler"): check<TaskScheduler>;
	instance(className: "Team"): check<Team>;
	instanceIsA(className: "Team"): check<Team>;
	instance(className: "Teams"): check<Teams>;
	instanceIsA(className: "Teams"): check<Teams>;
	instance(className: "TeleportService"): check<TeleportService>;
	instanceIsA(className: "TeleportService"): check<TeleportService>;
	instance(className: "TerrainRegion"): check<TerrainRegion>;
	instanceIsA(className: "TerrainRegion"): check<TerrainRegion>;
	instance(className: "TestService"): check<TestService>;
	instanceIsA(className: "TestService"): check<TestService>;
	instance(className: "TextFilterResult"): check<TextFilterResult>;
	instanceIsA(className: "TextFilterResult"): check<TextFilterResult>;
	instance(className: "TextService"): check<TextService>;
	instanceIsA(className: "TextService"): check<TextService>;
	instance(className: "ThirdPartyUserService"): check<ThirdPartyUserService>;
	instanceIsA(className: "ThirdPartyUserService"): check<ThirdPartyUserService>;
	instance(className: "TimerService"): check<TimerService>;
	instanceIsA(className: "TimerService"): check<TimerService>;
	instance(className: "TouchInputService"): check<TouchInputService>;
	instanceIsA(className: "TouchInputService"): check<TouchInputService>;
	instance(className: "TouchTransmitter"): check<TouchTransmitter>;
	instanceIsA(className: "TouchTransmitter"): check<TouchTransmitter>;
	instance(className: "Trail"): check<Trail>;
	instanceIsA(className: "Trail"): check<Trail>;
	instance(className: "Translator"): check<Translator>;
	instanceIsA(className: "Translator"): check<Translator>;
	instance(className: "TweenBase"): check<TweenBase>;
	instanceIsA(className: "TweenBase"): check<TweenBase>;
	instance(className: "Tween"): check<Tween>;
	instanceIsA(className: "Tween"): check<Tween>;
	instance(className: "TweenService"): check<TweenService>;
	instanceIsA(className: "TweenService"): check<TweenService>;
	instance(className: "UIBase"): check<UIBase>;
	instanceIsA(className: "UIBase"): check<UIBase>;
	instance(className: "UIComponent"): check<UIComponent>;
	instanceIsA(className: "UIComponent"): check<UIComponent>;
	instance(className: "UIConstraint"): check<UIConstraint>;
	instanceIsA(className: "UIConstraint"): check<UIConstraint>;
	instance(className: "UIAspectRatioConstraint"): check<UIAspectRatioConstraint>;
	instanceIsA(className: "UIAspectRatioConstraint"): check<UIAspectRatioConstraint>;
	instance(className: "UISizeConstraint"): check<UISizeConstraint>;
	instanceIsA(className: "UISizeConstraint"): check<UISizeConstraint>;
	instance(className: "UITextSizeConstraint"): check<UITextSizeConstraint>;
	instanceIsA(className: "UITextSizeConstraint"): check<UITextSizeConstraint>;
	instance(className: "UILayout"): check<UILayout>;
	instanceIsA(className: "UILayout"): check<UILayout>;
	instance(className: "UIGridStyleLayout"): check<UIGridStyleLayout>;
	instanceIsA(className: "UIGridStyleLayout"): check<UIGridStyleLayout>;
	instance(className: "UIGridLayout"): check<UIGridLayout>;
	instanceIsA(className: "UIGridLayout"): check<UIGridLayout>;
	instance(className: "UIListLayout"): check<UIListLayout>;
	instanceIsA(className: "UIListLayout"): check<UIListLayout>;
	instance(className: "UIPageLayout"): check<UIPageLayout>;
	instanceIsA(className: "UIPageLayout"): check<UIPageLayout>;
	instance(className: "UITableLayout"): check<UITableLayout>;
	instanceIsA(className: "UITableLayout"): check<UITableLayout>;
	instance(className: "UIPadding"): check<UIPadding>;
	instanceIsA(className: "UIPadding"): check<UIPadding>;
	instance(className: "UIScale"): check<UIScale>;
	instanceIsA(className: "UIScale"): check<UIScale>;
	instance(className: "UserGameSettings"): check<UserGameSettings>;
	instanceIsA(className: "UserGameSettings"): check<UserGameSettings>;
	instance(className: "UserInputService"): check<UserInputService>;
	instanceIsA(className: "UserInputService"): check<UserInputService>;
	instance(className: "VRService"): check<VRService>;
	instanceIsA(className: "VRService"): check<VRService>;
	instance(className: "ValueBase"): check<ValueBase>;
	instanceIsA(className: "ValueBase"): check<ValueBase>;
	instance(className: "BinaryStringValue"): check<BinaryStringValue>;
	instanceIsA(className: "BinaryStringValue"): check<BinaryStringValue>;
	instance(className: "BoolValue"): check<BoolValue>;
	instanceIsA(className: "BoolValue"): check<BoolValue>;
	instance(className: "BrickColorValue"): check<BrickColorValue>;
	instanceIsA(className: "BrickColorValue"): check<BrickColorValue>;
	instance(className: "CFrameValue"): check<CFrameValue>;
	instanceIsA(className: "CFrameValue"): check<CFrameValue>;
	instance(className: "Color3Value"): check<Color3Value>;
	instanceIsA(className: "Color3Value"): check<Color3Value>;
	instance(className: "DoubleConstrainedValue"): check<DoubleConstrainedValue>;
	instanceIsA(className: "DoubleConstrainedValue"): check<DoubleConstrainedValue>;
	instance(className: "IntConstrainedValue"): check<IntConstrainedValue>;
	instanceIsA(className: "IntConstrainedValue"): check<IntConstrainedValue>;
	instance(className: "IntValue"): check<IntValue>;
	instanceIsA(className: "IntValue"): check<IntValue>;
	instance(className: "NumberValue"): check<NumberValue>;
	instanceIsA(className: "NumberValue"): check<NumberValue>;
	instance(className: "ObjectValue"): check<ObjectValue>;
	instanceIsA(className: "ObjectValue"): check<ObjectValue>;
	instance(className: "RayValue"): check<RayValue>;
	instanceIsA(className: "RayValue"): check<RayValue>;
	instance(className: "StringValue"): check<StringValue>;
	instanceIsA(className: "StringValue"): check<StringValue>;
	instance(className: "Vector3Value"): check<Vector3Value>;
	instanceIsA(className: "Vector3Value"): check<Vector3Value>;
	instance(className: "VirtualInputManager"): check<VirtualInputManager>;
	instanceIsA(className: "VirtualInputManager"): check<VirtualInputManager>;
	instance(className: "VirtualUser"): check<VirtualUser>;
	instanceIsA(className: "VirtualUser"): check<VirtualUser>;
	instance(className: "Visit"): check<Visit>;
	instanceIsA(className: "Visit"): check<Visit>;
	instance(className: "WeldConstraint"): check<WeldConstraint>;
	instanceIsA(className: "WeldConstraint"): check<WeldConstraint>;
}

declare namespace t {
	/** creates a static type from a t-defined type */
	export type static<T> = T extends check<infer U> ? U : never;
}

declare const t: t;
export = t;
