# Unify2026 DS — Component Inventory (master catalog)

Full sweep of `SHARED COMPONENTS` + `APPLICATION COMPONENTS` pages in the DS source file
(`qT9zH1YYapGTwpJxwNEGzt`), captured 2026-06-26. **Check here FIRST before composing anything
locally** — if a role appears below, use the DS component, don't hand-roll.

Format: `Component name` · setKey · defaultVariantKey · key variant axes.
To instantiate: `importComponentByKeyAsync(defaultVariantKey)` then `setProperties({...})` to pick
variants. Override handles (text-layer names, swap props) for components already used in builds live
in `figma-keys.md`; capture them lazily on first use of any new component.

Sub-components prefixed `_` are internal atoms — prefer the top-level molecule.

---

## APPLICATION COMPONENTS

### Headers (page `190:4871`)
- `Page Header` · `05c7817d19672a6aea95eae4ed829aaff48dd65a` · `836e668f2ffb20931475bad996d8762cb8ae4ddf` · Type[Default,With Toggle] · Divider · Badges/Description/Actions/Show App Icon/Back Button(bool)
- `Form Header` · `c60a0e7f5b739ab47b2c816a2ca2f53b752d710c` · `94457bdd98af75710a6f553a532d09fdce28f52e` · Level[1,2,3,3 Alt] · Supporting text/Actions/Divider/Help Icon/Featured icon/Search/More/Badge(bool)
- `Header` · `1c3690e4d550137e49f22ce1638dbd8626ebeede` · `d249267fb4c905faf2a46c187e635f54f8705bd2` · Level[1-3] · Tabs · Type[Default,Back] · Dropdown icon/Supporting text/Divider/Badge/Featured Icon/Search/Actions(bool)
- `Section label` · `f7374d40b59bf540d709d0ea6fc6f2e16151155f` · `be9e435b8325737bb8b98a5484a68ea32b5a0e2f` · Level[1,1 Alt,1 Alt2,2,3,4,0] · Supporting text/Actions
- `Sidepane header` · `754936fe4d8a8c2f2142b88ec1790e44259b430b` · `a6b7eb0ed664a3e49b122e3789cc82e4a569c8a2` · Type[Default,Back,Featured Icon] · Size[md,sm] · Tabs · Supporting text/Badge/Icon  ← dedicated right-rail/sidepane header
- `Filter Bar` · `c5371c722ec44b2ae2f49a93e3ad0078e4255884` · `ab53c40808bd081d3d764fcea17696370389dcbd` · Type[Double,Single] · Bulk Action · Heading/Actions/Quick Filter
- `Automation Builder Header Bar` · `1e5462530bad70f009462a3d18f5a8c469df846b` · `a625fe463e2eb424e3b9697b13ec37f2a9656e5b` · Type[Build,Test Mode]
- `Automation Builder Sub Header Bar` · `b5797054b2aef7f6ec0cee137cb98590471d51b2` · `a5bcfb395cdc75dafbfc9d66f578bc3c91069524` · Type[Clear,Success,Error]
- `LC Builder Header + Preview Bar` · `f2ce497eab404ba58ec6e8215ccf36c142ceb6f9` · `f42624c5f91808b17dcde31666bdba9d1a9ea0d1` · Type[Builder Header,Preview] · Screen[Desktop,Mobile,Display]
- `Automation sidepane Header` · `11b166f7c95b49e31b7d222708bd4c2569de22f9` · `f1b8c220576f272f7eac1feb85404c890d46d55f` · Tab · Actions/Icon/Global Errors/Supporting Text

### Side Panel (page `9501:2358`)
- `Side Panel header` · `9dc812e0de353ae51bc748d50a9d2d37a1ad7c2a` · variants: Basic/With Icon+Subtitle × Tabs[T/F]. With Icon+Subtitle Tabs=False → `3a85d3a804f569554c9da31a846229f4259a0652`; Tabs=True → `c48d0eb31845dbaf65db40fa8fbf699ab478f15d`. Booleans Back Button/Breadcrumb/Divider/Pill/Subtitle/Actions
- `Side Panel` (body) · `bfafe72a9742976cdf12cd17297b13d31116a17f` · Type[Key Value `5e45930bfe7d7c936c6db64f27ad52ef41d59e84`, Table `96b741dbd960258b902cbf6fcc49215e185409ff`]

### Modals (page `172:4293`)
- `Modal Unit` · `5152fb17ee283bb2ef0246113a80cd2db9c3b9ac` · `276bc40f6989c48b1a334c5f43dea6fb84c161f2` · Type[xs-nofields,sm,md,lg,lg-with stepper,lg-with doc,lg-with side pane,sm-info,…] · Scroll bar
- `Modal header` · `127078735a604474e43303f203093d6e7fbcc935` · `04616262925e3ee8d0518876b0ee6299cb1b2225` · Type[Default,Subtext Single line] · X close/Tabs/Featured Icon
- `Modal actions` · `11ba713e5be571ce0018a18ec82edbd5ec577e5d` · `e913fe336ce9556774d4725d75aed6d20ee52aa0` · Type[Horizontal fill,Horizontal right(checkbox)] · Size[sm,xs] · Destructive/Inset/Divider/Checkbox/Tertiary button
- `Modal Full Screen` · `4a500dd96179bbfc5e0fb72665f471950ba7a9b9` · `9e0181f5507980ba0f36fd8e024d7c7c7ee7407b` · Type[Fixed size,Double Pane modal]
- `Popover modal` · `4cb54f4130e07926e64bcb27856fab1586422360` · `79451a4bcb2d9743998aa4afa2ebcd6c33d0c45d` · Style[Outline] · Actions
- `Popover header` · `32dc4a3f16e611e17137c8ad5dda6a4758d72141` · `faaa74c3fcf7075a77ae9bbe9d8a4c9c1866eec1` · Border[No,Yes] · Supporting text/Icon
- `Docs` · `6da40d2496919dc9d3aac2e83516489623356e77` · `8265c9a7c95ecf1fb56e05583138e2711f5c7a3e` · Framed[No,Yes]

### Section footers (page `3275:371793`)
- `Section footer` · `3275:372571` (frame) → Type[Default `3275:373080`, 1120, 800] (form/page footers)
- `Side panel footer` · `0773869e9aa1848dc24fa089be7b468e86ddf8dc` · Double Button `495409664b1a0b17e10517f38a1f4222697abdb3` / Message `f297baad458bd12c550efb1b04e3f46ad07ae32d`
- `Builder Footer` · frame `14600:87610` → Type[Slide Up `14600:87609`, Actions `14600:87611`]

### Tabs (page `43:0`)
- `Horizontal tabs` · `85bd5cc93ea8daefcb4cffe72f5d20693a5d0a2a` · `f1472da08f857d83f6e1602c7172ac7de1fa6065` · Style[Default,Arrow,Double Line,Folder Tab,Rounded Folder Tab,Button Tabs] · Start Icon Style · Size[sm,xs]
- `Vertical tabs` · `abb68a68b033887c73b548c2ea68be766f78d203` · `8c07c7a277cd6fa5dda9e87fc0c2202c07a3c460` · Type[Default,With Icon]
- `Filter Tabs Base` · `85be270122f8a6f8705ceee76d353dcc3f47b119` · `ae37eba71d30797bbbed4d8099fba055a7352324` · Size[sm,md,lg] · Applied/Icon/Counter
- (atoms: `Button Tab base` `3a9fe403a4beffc621a7a49be482b19106a35c6e`, `_Tab base` `f6e8510153f988027f14cb2c3e8c5cac96de5315`)

### Tables (page `214:0`)
- `Table` · `64048af04a68983c637e24ffe7b49d206822d6d1` · `354ae129a68dca5e4194b2aaaed60fd22d16e475` · Size[sm,md] · Filter Bar/Header/Pagination
- `Table cell` · `34c04a32c4f28853e94b647b6797a1ace1aed1d7` · `4bdbf453254986850e7ce766bb79598f9cb6739f` · Style[Text,Image w/text,Avatar w/text,Checkbox,Radio,Toggle,Badge single,Badges multiple,Progress bar,Avatar group,Action buttons,Action icons,Star ratings,Long Text,…] · Lead · Size[sm,md,lg]
- `Col Header Cell` · `0db64fc3eab01c2492b3056a4459ae0423829150` · `1819cd157fcaa1c0cefdaa27a38028b43cac7d94` · Checkbox · Size[md,sm,lg-double line]
- `Filter dropdown` · `d3a004830f810f5b5c6126de7cf540eb51dbb3f4` · `d49d288f14bac24bf06abc11af9de6eeedf2af74` · Level[1,2,3 levels]
- `Condition Field` · `cc1387b79801747c1dcb684eacc920ca89202dd6` · `4c43c5e035acbae0c275bd5c75021ed73a608b31` · Property[Where,And/or]

### Code snippets (page `1221:106300`)
- `Code snippet` · `b02411f8b10673a13ec42f20f731c367e06f808d` · Label=No `fd92ad8ee491894ff648c402d52a13d1450ea4cc` / Label=Yes `c881eb2020b8238797d44f0702f4b602a81b894c` · Header/Maximise/Toggle/Token Dropdown/Show Scroll bar(bool). Code area = `Code` TEXT node; gutter = `Number Wrap` frames (hide extras).

### Alerts & notifications (page `176:4256`)
- `Alert` · `1ff1f5385f67805edac0c9c97d9aaf327e51a362` · `b56594770d731685aba5efb99df1ba3671f5d700` · Color[Error,Warning,Brand,Default,Success,Grey,Brand Secondary] · Size[sm,md,lg] · Actions/Supporting text/Title/Icon
- `Information Box` · `deb5293f7e1313c91f43c3a37b39609a8aeb196d` · `7dd9b87464ffbcfaa5853bef6bfcd5d63200193d` · Color[Default,Brand,Error,Warning,Success] · Featured Icon/Input Box/Actions/Header
- `SnackbarNew` · `4edb640a5b5e9db22259dac4a00f41368a92a1ec` · `dc03d22e1f7bc6f82b7bdbebdd8580aab8a89a0c` · Color[Success,Neutral,Error,Warning,Grey] · Actions/Description
- `_Notification` · `af011ef25c7fe89a173fc83fb0350fb9fac18ab7` · Type[Primary icon,Image,Avatar,Gray/Error/Warning/Success icon,No icon,Progress]
- `Notification Panel` · `0f6f4a3871eb30111b8e45221be2a36f702a1a17` · States[Default,3 dots,Empty]
- `Global Errors` · `db9e103c7f004475bf30dfc49a36a15219090c45` · Type[Slideout,Page]

### Breadcrumbs (page `43:3087`)
- `Breadcrumb Bar` · `879824224269cd8466c18e2a5cf8601eaee58469` · `20770ff9cdc34f83a031cc2e17e109cbca5b668b` · Type[Default,With Button]
- `_Breadcrumbs` (inline) · `a0238f48ebe87ae1d291648831473144d0653703` · Size[xs,sm,md,(+with dropdown)]

### Pagination (page `225:7288`)
- `Pagination` · `b5cfaba5b90b2a592ade3b64d612eb8611cab9a9` · `9810a02cb8858fed1dffc2557825441fb1a80440` · Type[With Buttons,With Page Input] · Platform[Web,Mobile]
- `Pagination dot group` · `d733215249f2a8f00fd3f8a0d86ccdae4e67ccb9` · Style[Dot,Line] · Framed
- `Carousel image` · `5e10ad4911da7ecdbeef5f91e8692703dbb177b4` · Size[md,lg]

### Progress steps + Timeline (page `53:1288`)
- `Step base` · `ef72156ba506fee6a17984e7357466fb51cf3048` · `56617e4850a7905f3f87e4d13a3cc3c041f36a4c` · Status[Incomplete,Current,Complete,Error] · Type[Icon only,Icon left,Featured icon left,Arrow stepper,…]
- `Progress steps / … Horizontal` · `595c2eee2b0f807870f75fe781c32038aff82d60` · `Vertical` `f4ad1a3472566272c1c2494841c8cbe6483a149c`
- `Timeline` · `99825d73c1ebaf264592521407d28ea68398f036` · `10a52ada4271ee3f061d23d4c5b052f2583486e1` · Type[Dot,Featured icon] · Orientation[Vertical,Horizontal]
- `Activity` · `4f11427064c7bf39678a2000de0b626996bd5755` · Type[Dot,Avatar] · Size[sm,lg,xs]

### Messaging (page `10021:10301`)
- `Message` · `f90e6af0821769348df2351c3df657d893422c66` · `fbf99d5cc6860859ac816c4367a000dbd545b026` · Type[Received,Sent,Writing,Sent attachment,Received attachment] · Reactions

### Navigation (page `82:1862`)
- `LC_Sidebar Navigation_Icon Only` · `536e437d411ad84a0b772bf48366c259571f64e7` · `2c5b05d1cd6b1a8ec6762fb15af4484a446253a9` · Style[Framed,Stroke,Framed-lg] · Show Header/Footer
- `LC_Sidebar Navigation_Framed` · `045bc2265be8614feee0e3cd3f78d59492f05f2c` · Open · Floating · Show Header/Footer
- `LC_Sidebar Navigation_Stroke` · `fae6a1b1b98888e3f0c16777801a2550f666bd94`
- `LC_Header Navigation` · `9a66e3db62acc0566baa1e58506f3d1d7e6303bb` · Style[Stroke,Solid] · Floating
- `LC_Bottom Navigation` · `4d4ba44f31d1445a06e04411bd04715be851d028` · Breakpoint[Mobile,Tablet Bottom]
- `New_Platform Navigation` · `6bce4f82223dcd43e942e72bfcbde45bd8d46d6e` · State[Closed,Open] · Sub Menu
- `Secondary navigation` · `acbc41600e56f44e23562e05924b6992245ba460` · Type[Settings,Projects,Copilot]
- (nav-unit atoms: `Base_LC_Nav Unit_Icon Only` `6d8a4c0bb4ebfac9f462c0b955952c1a16fa83f2`, `Settings_Nav item base` `17394d4e6601bbb9d0748900ae5c1aac885a8dcd`, sidebar/header units per family)

### Date pickers (page `1143:85678`)
- `DatePicker` (cell) · `7f9f4bfe6a36c6785b530a114953ea956c2d0f55` · Type[Today,Inactive,Unavailable,Middle,Active]
- `Platform - Date time picker menu` · `1903b848f6cce1cf46e5fb00db5cbe207a5baf86` · Type[Date and Time Range,Date Only,Date Range] · Quick Selection
- `LC-datepicker-desktop` · `feb56d1760653abbd3c0e1264a49c26b7b7c211c` · Type[Dual Month,Date Only,Weekly,Date Range]

### Empty states (page `1172:31`)
- `Empty State` · `79590f4035a847d4b5c06f10318288e09556dd29` · `a64dfe53928905d3077dacaa16d4f5015402b8dc` · Type[Default,Descriptive] · Size[md,sm] · Learn More/Sub-Text
- `Empty State - Button` · `d0e0d7bfb4d0e10145dddeea9820d2ae7deafd59` · Type[With CTA,With CTA-sm] (dashed add-row trigger)
- `Empty State - Stepper` · `3fa5456c26ec45baaec15d07cb6c3bac8ff54a54` · Active Step[1,2,3]
- `Chat Empty State` · `0337e41908b5e2dab422dae690ac33f9eed341dd` · Type[Copilot,Comment,Comment 2]
- `_Illustration` · `64bb26103f21f2a8e4daae4ea9d280475c5855c6` · Style[Cloud,Box,Documents,Credit card]

### Loading indicators (page `1172:32`)
- `Loading indicator` · `2711317bebfc0a7a250e001f38068bc1fb02392e` · `3c047933ae615937e0dc2a316e2bfdc355716e28` · Style[Dot circle,Line spinner,Line simple] · Size[xs..xl]

### File upload (page `1157:90306`)
- `File Upload empty state` · `6b21f90e55ddd919ebb985deac2f9d40004005a3` · `e5c17d2e922659df636c1adcfaafca1b59e52d69` · File drag and drop · Size[xl,lg,md]
- `Uploaded File base` · `68b61542269d60d8535e961376e0810267f07be1` · `213e1fbc8b399457576fbd1ecf57e00ddf9d7f3b` · Icon type[File type,Simple,Image] · State[In progress,Complete,Error]
- `_ LC_File upload` · `5a04d626978509d219eb6782bb6c11d176c9801c` · State[Dragging,Disabled,Default] · Uploaded

---

## SHARED COMPONENTS

### Buttons (page `1:1183`)
- `Buttons/Button Brand` · `4734389538bc2d0beec7a14b6b03ea32abb43cc0` · `899e987805b20e5cec570bda636bb8a08842129c` · Size[xs,sm,md,lg] · Hierarchy[Primary,Secondary,Tertiary] · Icon[Default,Dot leading,Only] · State[…,Loading] · Icon leading/trailing(bool)+swaps
- `Buttons/Button Neutral` · `7be96c9ee274f472dead656f7d1d67120b4adaff` · `665a4db4de2fd01bd24ba7ebc7e6cf3eb641903f` · (same axes)
- `Buttons/Button Error` · `6ff5a392705d804427b1d87bb3017fd434f4ff57` · `082e48f74104d4ff3ce56ab19d4c1cc87a7a6621`
- `Buttons/Button Success` · `2df244f857811bd2defdcbdff311ba3e88d4315d` · `1912036f4b8aeaf423bf20e7624e80d1a521d2b2`
- `Buttons/Button AI` · `272a55b31ee92e97850c18fbe860bf296ff7c51b` · `bfc50b25a23abaef08136a6d94cb6e5f70bbeb59`
- `Buttons/Link` · `d232b601a97946ba482ce004dd04ba2c585baa5e` · `459ebf6d90508e66b00b3f7f42ec2385d338c77d` · Hierarchy[Primary,Secondary,Destructive,Success]
- `Buttons/Split Button Brand` · `6bb17cc37906ce807e023763679a0a22abf29cc1` · Side[Left,Both,Right] · (Neutral: `c2212d97434b083a0ba6b8ab2bc83f899b4b9796`)
- `Small Icon Button` · `7b87bd5aa62908e65aa2fda0f587ac12e2e20998` · `24f546ecec3ec6f63ab57dd96d653a4766ac26fb` · Size[xxs..xxl] · 🔀 Icon swap  ← USE for header/toolbar icon buttons (don't hand-roll)
- `_Button close X` · `7c000b7785163cb311c83b7721aa75d0fb40565c` · Size[sm] · Dark background  ← real close-X button
- `SSO Button` · `f7a2e44a79936bda47b8daf28e64bb5447155aa6` · Theme[Color,Gray]

### Button + Toggle groups (page `16:399`)
- `Toggle group` · `6267fc6886d9519de3bae1f4a1364dc44068428b` · `df0002e12d06525dbe311fa1051305f706ffff83` · Type[Brand,Neutral,Inset] · Style[Text,Icon w/text,Icon only] · Size[xs..xl] (pill page-tabs / segmented)
- `Button group` · `3bddb5134aaf0614782db73d392ca5e57dc5dbbb` · `ba4380ea6c2229d8fff5424d45f3c482549e5093` · Style[Text,Icon w/text,Icon only]

### Inputs (page `85:1269`)
- `Input field_outline` · `62a4e15407ce55b43db72b277ff542b311726a4e` · `abb933c73d148e7e8c41bbd8ea15e61580822c5f` · Size[xs,sm,md,lg] · Type[Default,Icon leading,Leading/Trailing dropdown,Leading text,Payment,Tags,Trailing button] · State[Placeholder,Filled,Focused,Disabled,Read Only] · Label/Hint/Help/Leading icon/Encryption(bool)
- `Input field_solid` · `4604c611bb223c53c2bb4643a5661b5b8ca33aec` · `Input field_ghost` · `8099e33657417734455887792c93237553f6adea`
- `Textarea input field` · `9dd4562f1a4fcf2aec4acbf17e0f5ad1a4e06add` · `85eb202936ac8aa29019384d70377af8ef8137ab` · Type[Default,Tags] · Character Limit
- `Textarea input field_Rich Text` · `b7b24e77206847e41a18979fabdfdf365226d492` · Type[Bar,Floating]
- **`Key Value Vertical`** · `31fc2986a2191994cc11646bb3e15766614a80ab` · `64f033ef2c8183fbf51e7893e45297360528451b` · Type[Text Only,Badges Only,Button Only,Avatar+Text,Text+Badges,…] · State[Non-Editable,Editable,Hover,On Edit] · Label/Featured Icon/Avatar
- **`Key Value Horizontal`** · `75f324c4456045b5e518cd200a67d3cd6eb81bf7` · `fc998dabd874334a4539397bb1a041de071225ce` · (same Type axis) · Subtext/Info Icon/Divider/Badges  ← THE metadata label/value row (Details rail, record fields)
- `Label` · `080b25ce9a25ee93e4dd90ec8d030ffeb5488e69` · Label help · Label-Type[Default,Underline]
- `Verification code input field` · `72f33e267ee6bc772faf7a0a143ed7dd8698e47a` · Digits[4,5,6]
- `WYSIWYG toolbar` · `f0302b868055594d4769230f4dec744e57ef43e0`

### Dropdowns (page `18:0`)
- `Input dropdown_outline` · `fd1971baf0e0e8f96212ab3bc989acce09c21739` · `f1d6d03de058b6ea83ad80044e21cd43e637d36c` · Type[Default,Icon leading,Avatar leading,Dot leading,Tags] · State[Placeholder,Default,Focused,Open,Disabled,Read Only] (solid `a6cfd53bfb45e8d7fc468747ddfddba385e0a5b7`, ghost `d701e7c6fc6950c6334ef371aae78b7540269f15`)
- `Input Menu Dropdown` · `6b0c7c2af450141e3aa2ef094dcb0fbe61594ae1` · `4d9f58fce9da6394379e7930030c336ace08e676` · Type[Single Select,Multi Select,Empty State with Button] · Scroll Bar/Footer
- `Dropdown list item` · `9e0a147de66cbdbd450a68413b3c5ced62e4466e` · `36223a5d25ae39c77a99cf1151ea87478269f5e3` · Start Type[Default,Avatar,Toggle,Checkbox] · End Type[Shortcut,Reorder,Icon]
- `Input dropdown Menu Item` · `8036b873d83720c69d70c7fb88d4ab0397e25c6f` · `Input Dropdown Multi-Select Menu Item` · `3fc66aa16d09f3c8f56889393dbbcef8e3f2ca17`
- `Dropdown list header` · `814b89da4b736ebb0810cc42a01c1c0fe720ea36` · `Dropdown list footer` · `87ca904d2cd489dced26188e6fd601c042a425c1`

### List Item cards (page `122:3484`)
- **`List Item`** · `08002cf14b8f0807ae9b5b0a5e8b7f0b7c65f53b` · `850288d23446b7c5e115b16677e6d8ebf05d8294` · Type[Icon simple,Radio,Checkbox] · Size[sm,md] · Selected · Icon/Supporting Text/Badge/Actions/Action Buttons  ← generic list row (icon+title+supporting+action)
- **`List Item Cardified`** · `dca7729d39447f0994917e8b9fddce266717bf44` · `5e6d0ffb28b37cbe77b43e0d7e46f7833c55145d` · (same axes, carded) + Subtext
- `List Item Group` · `105f790a97cdf6cfe8d2bd82aa626081369d19b5` · `List Item Cardified Group` · `99164527d90ac070a1523f0fb48fcd49b0e1a1a5`

### Checkboxes (page `1097:63638`)
- `Checkbox` · `757b1b24b72a5fe60b12c4f3f46327d9cadc091f` · `e25b41a6f2f0f064be84ed65394ecc76381b4f33` · Type[Checkbox,Radio] · Checked/Indeterminate · Size[xs,sm] · Text/Hint Text
- `Checkbox List` · `506a3c26bdfed02cf304e2ac3f43c7774335ae05` · Type[Single Column,Double Column]

### Toggles (page `1102:4631`)
- `Toggle` · `5678aaffc370ce454d242b619ebd57e5ba694ab2` · `8bb3d7d9f6da31aae234ec8f9302a5b9d365b32d` · Pressed · Text · Size[xxs,xs,sm,md] · Hint Text · Label Position[Left,Right]
- `Text Toggle` · `37278c187e6c23ad18b2baf1dbbd7fcb1a849af1` · Size[md,sm]

### Pill (page `12:539`)
- `Tag` (status pill) · `3dddc40988d7e2aba1c1f37f2463088c34a5a1c1` · `bdef16d3a1f8e455682472ad3432dc7ea35ac56f` · Icon[False,Country,Avatar,Dot,Icon] · Action[X close,Text only,Count,Link] · Size[xs,sm] · Type[Outline,Solid]  (Tags page `3306:403749`)
- `_Pill rounded` · `e4dbe7e1eaf0094badfdec0bb33982ad246bef2d` · Color[Gray,Brand Secondary,Error,Warning,Success,Lime,Violet,Pigeon Blue,Terracotta,Mulberry,Warm Blue,Brand] · Type[Pill color,Pill Clear] · Icon[Dot,Country,Avatar,…]
- `Pill squared` · `abf550f75d70dc37b88be9c63cff92bb604ce097` · `Pill solid` · `134aa5f735606592e904d436659f2a783a357e6e`
- **`Code Pill`** · `9956224d226138792a7c28e02194cb7d0c0b22a2` · `9969d6a58486b56e8450a9a6b6142ef5904d9e39` · Size[md,sm,xs] · Color[Gray,Brand,Error,…] · Icon[Leading,Trailing,Dot,False]  ← real Code Pill (don't hand-roll mono pills)
- `Variable Pill` · `ace9b9255ee6e5a9471d08115b9d73df7ecfdd5c`

### Avatars (page `13931:29731`)
- `Avatar` · `3749c3719ae6809a979466c64049f41a08aa7234` · `3c4b364f5fe0f4314d85607d481c6995d5b9bac6` · Size[xxs..2xl] · Type[Icon,Letter] · Colour[Brand Solid,Gray,Brand Secondary,White] · Online Indicator
- `Avatar label group` · `f153185890ca38c4cc286b52e8ae142d9831d408` · Status icon[Online,Company,Verified] · Supporting Text
- `Avatar group` · `d672c5db6846f6c7271cbe3793509ed053758f80` · More users/Add more button
- `Avatar profile photo` · `82f0eee1ddbe4202a6ff996851c5a831e9846882` · Verified/Contrast border

### Stat Card (page `9012:17245`)
- `Stat Card` set present (icon badge + value + trend chip + title). Capture variant keys on first use.

### Progress indicators (page `1154:89940`)
- Progress bar / circle set present. Capture on first use.

### Sliders (page `1086:1423`)
- `Slider` (range) · `95f150181d542789506d37c0a617618f79f3843c` · `5e891739db11641b0173247cecb0a91a9a1bb48b`
- `Single Slider` · `171ed158916500c506b9e9ea2e5ad9a61b8ff9e8` · Dots · Label[False,Bottom,Top floating]

### Selection Pill (page `22081:8383`)
- `Selection Pill` · `8444e15652e54790ec5e06bce452cb575b0e77c1` · `b8df9677f72317ea910734a5c316b82a21544846` · Style[Outline,Solid] · Current · Counter/Icon/Dropdown
- `Selection Pill group` · `60130a3e7695cb0194f3a5008759984e8e6146d5`

### Scrollbar (page `30309:23743`)
- `Scroll bar` · `6f08302d51a9a4c3a93df3d716ef941b528028ac` · `a06524e799522beb771d6254da326430f892c626` · Orientation[Vertical,Horizontal] · Size[md,sm]

### Tooltips (page `1052:485`)
- `Tooltip` · `11802314eecc11ba77868aba8834ad0a8db0ae4b` · `e7a357c7a5fbddc671b87021104a1b1eb528a315` · Arrow[9 positions] · Supporting text/Icon/Link/Shortcuts/Codeblock
- `Help icon` · `ccbc366f2d02ae4efcacda88f3b7ec0de47a335c` · Tooltip[Top,Left,Right,…] · Supporting text

### Thumbnail (page `44289:6384`)
- `New Thumbnail` · `6d0b316775513d814ac160e7c4c24413c22be891` · Type[Unify,AI Agents,iPAAS,Low Code,Low Code Apps]
- `_Thumbnail` · `6f15dbb59524b98eb04a02d6b3e8a09b94d53d5c` · Property 1[Deferred,Design,Dev,Old,Review]

---

> Not yet captured in full (capture on first use): Stat Card variants, Progress indicator variants,
> Dropdowns long-tail, Filter dropdown page `61055:41969` (empty at top level — lives under Tables).
