var testData = {};
	
// JSON string, could get this from anywhere
testData.countryCodes = '[{"id":"AD","text":"Andorra"},{"id":"AE","text":"United Arab Emirates"},{"id":"AF","text":"Afghanistan"},{"id":"AG","text":"Antigua and Barbuda"},{"id":"AI","text":"Anguilla"},{"id":"AL","text":"Albania"},{"id":"AM","text":"Armenia"},{"id":"AN","text":"Netherlands Antilles"},{"id":"AO","text":"Angola"},{"id":"AQ","text":"Antarctica"},{"id":"AR","text":"Argentina"},{"id":"AS","text":"American Samoa"},{"id":"AT","text":"Austria"},{"id":"AU","text":"Australia"},{"id":"AW","text":"Aruba"},{"id":"AX","text":"Aland Islands"},{"id":"AZ","text":"Azerbaijan"},{"id":"BA","text":"Bosnia and Herzegovina"},{"id":"BB","text":"Barbados"},{"id":"BD","text":"Bangladesh"},{"id":"BE","text":"Belgium"},{"id":"BF","text":"Burkina Faso"},{"id":"BG","text":"Bulgaria"},{"id":"BH","text":"Bahrain"},{"id":"BI","text":"Burundi"},{"id":"BJ","text":"Benin"},{"id":"BM","text":"Bermuda"},{"id":"BN","text":"Brunei Darussalam"},{"id":"BO","text":"Bolivia"},{"id":"BR","text":"Brazil"},{"id":"BS","text":"Bahamas"},{"id":"BT","text":"Bhutan"},{"id":"BV","text":"Bouvet Island"},{"id":"BW","text":"Botswana"},{"id":"BY","text":"Belarus"},{"id":"BZ","text":"Belize"},{"id":"CA","text":"Canada"},{"id":"CC","text":"Cocos (Keeling) Islands"},{"id":"CD","text":"Democratic Republic of the Congo"},{"id":"CF","text":"Central African Republic"},{"id":"CG","text":"Congo"},{"id":"CH","text":"Switzerland"},{"id":"CI","text":"Cote D\'Ivoire (Ivory Coast)"},{"id":"CK","text":"Cook Islands"},{"id":"CL","text":"Chile"},{"id":"CM","text":"Cameroon"},{"id":"CN","text":"China"},{"id":"CO","text":"Colombia"},{"id":"CR","text":"Costa Rica"},{"id":"CS","text":"Serbia and Montenegro"},{"id":"CU","text":"Cuba"},{"id":"CV","text":"Cape Verde"},{"id":"CX","text":"Christmas Island"},{"id":"CY","text":"Cyprus"},{"id":"CZ","text":"Czech Republic"},{"id":"DE","text":"Germany"},{"id":"DJ","text":"Djibouti"},{"id":"DK","text":"Denmark"},{"id":"DM","text":"Dominica"},{"id":"DO","text":"Dominican Republic"},{"id":"DZ","text":"Algeria"},{"id":"EC","text":"Ecuador"},{"id":"EE","text":"Estonia"},{"id":"EG","text":"Egypt"},{"id":"EH","text":"Western Sahara"},{"id":"ER","text":"Eritrea"},{"id":"ES","text":"Spain"},{"id":"ET","text":"Ethiopia"},{"id":"FI","text":"Finland"},{"id":"FJ","text":"Fiji"},{"id":"FK","text":"Falkland Islands (Malvinas)"},{"id":"FM","text":"Federated States of Micronesia"},{"id":"FO","text":"Faroe Islands"},{"id":"FR","text":"France"},{"id":"FX","text":"France"},{"id":"Me","text":"Metropolitan"},{"id":"GA","text":"Gabon"},{"id":"GB","text":"Great Britain (UK)"},{"id":"GD","text":"Grenada"},{"id":"GE","text":"Georgia"},{"id":"GF","text":"French Guiana"},{"id":"GH","text":"Ghana"},{"id":"GI","text":"Gibraltar"},{"id":"GL","text":"Greenland"},{"id":"GM","text":"Gambia"},{"id":"GN","text":"Guinea"},{"id":"GP","text":"Guadeloupe"},{"id":"GQ","text":"Equatorial Guinea"},{"id":"GR","text":"Greece"},{"id":"GS","text":"S. Georgia and S. Sandwich Islands"},{"id":"GT","text":"Guatemala"},{"id":"GU","text":"Guam"},{"id":"GW","text":"Guinea-Bissau"},{"id":"GY","text":"Guyana"},{"id":"HK","text":"Hong Kong"},{"id":"HM","text":"Heard Island and McDonald Islands"},{"id":"HN","text":"Honduras"},{"id":"HR","text":"Croatia (Hrvatska)"},{"id":"HT","text":"Haiti"},{"id":"HU","text":"Hungary"},{"id":"ID","text":"Indonesia"},{"id":"IE","text":"Ireland"},{"id":"IL","text":"Israel"},{"id":"IN","text":"India"},{"id":"IO","text":"British Indian Ocean Territory"},{"id":"IQ","text":"Iraq"},{"id":"IR","text":"Iran"},{"id":"IS","text":"Iceland"},{"id":"IT","text":"Italy"},{"id":"JM","text":"Jamaica"},{"id":"JO","text":"Jordan"},{"id":"JP","text":"Japan"},{"id":"KE","text":"Kenya"},{"id":"KG","text":"Kyrgyzstan"},{"id":"KH","text":"Cambodia"},{"id":"KI","text":"Kiribati"},{"id":"KM","text":"Comoros"},{"id":"KN","text":"Saint Kitts and Nevis"},{"id":"KP","text":"Korea (North)"},{"id":"KR","text":"Korea (South)"},{"id":"KW","text":"Kuwait"},{"id":"KY","text":"Cayman Islands"},{"id":"KZ","text":"Kazakhstan"},{"id":"LA","text":"Laos"},{"id":"LB","text":"Lebanon"},{"id":"LC","text":"Saint Lucia"},{"id":"LI","text":"Liechtenstein"},{"id":"LK","text":"Sri Lanka"},{"id":"LR","text":"Liberia"},{"id":"LS","text":"Lesotho"},{"id":"LT","text":"Lithuania"},{"id":"LU","text":"Luxembourg"},{"id":"LV","text":"Latvia"},{"id":"LY","text":"Libya"},{"id":"MA","text":"Morocco"},{"id":"MC","text":"Monaco"},{"id":"MD","text":"Moldova"},{"id":"MG","text":"Madagascar"},{"id":"MH","text":"Marshall Islands"},{"id":"MK","text":"Macedonia"},{"id":"ML","text":"Mali"},{"id":"MM","text":"Myanmar"},{"id":"MN","text":"Mongolia"},{"id":"MO","text":"Macao"},{"id":"MP","text":"Northern Mariana Islands"},{"id":"MQ","text":"Martinique"},{"id":"MR","text":"Mauritania"},{"id":"MS","text":"Montserrat"},{"id":"MT","text":"Malta"},{"id":"MU","text":"Mauritius"},{"id":"MV","text":"Maldives"},{"id":"MW","text":"Malawi"},{"id":"MX","text":"Mexico"},{"id":"MY","text":"Malaysia"},{"id":"MZ","text":"Mozambique"},{"id":"NA","text":"Namibia"},{"id":"NC","text":"New Caledonia"},{"id":"NE","text":"Niger"},{"id":"NF","text":"Norfolk Island"},{"id":"NG","text":"Nigeria"},{"id":"NI","text":"Nicaragua"},{"id":"NL","text":"Netherlands"},{"id":"NO","text":"Norway"},{"id":"NP","text":"Nepal"},{"id":"NR","text":"Nauru"},{"id":"NU","text":"Niue"},{"id":"NZ","text":"New Zealand (Aotearoa)"},{"id":"OM","text":"Oman"},{"id":"PA","text":"Panama"},{"id":"PE","text":"Peru"},{"id":"PF","text":"French Polynesia"},{"id":"PG","text":"Papua New Guinea"},{"id":"PH","text":"Philippines"},{"id":"PK","text":"Pakistan"},{"id":"PL","text":"Poland"},{"id":"PM","text":"Saint Pierre and Miquelon"},{"id":"PN","text":"Pitcairn"},{"id":"PR","text":"Puerto Rico"},{"id":"PS","text":"Palestinian Territory"},{"id":"PT","text":"Portugal"},{"id":"PW","text":"Palau"},{"id":"PY","text":"Paraguay"},{"id":"QA","text":"Qatar"},{"id":"RE","text":"Reunion"},{"id":"RO","text":"Romania"},{"id":"RU","text":"Russian Federation"},{"id":"RW","text":"Rwanda"},{"id":"SA","text":"Saudi Arabia"},{"id":"SB","text":"Solomon Islands"},{"id":"SC","text":"Seychelles"},{"id":"SD","text":"Sudan"},{"id":"SE","text":"Sweden"},{"id":"SG","text":"Singapore"},{"id":"SH","text":"Saint Helena"},{"id":"SI","text":"Slovenia"},{"id":"SJ","text":"Svalbard and Jan Mayen"},{"id":"SK","text":"Slovakia"},{"id":"SL","text":"Sierra Leone"},{"id":"SM","text":"San Marino"},{"id":"SN","text":"Senegal"},{"id":"SO","text":"Somalia"},{"id":"SR","text":"Suriname"},{"id":"ST","text":"Sao Tome and Principe"},{"id":"SU","text":"USSR (former)"},{"id":"SV","text":"El Salvador"},{"id":"SY","text":"Syria"},{"id":"SZ","text":"Swaziland"},{"id":"TC","text":"Turks and Caicos Islands"},{"id":"TD","text":"Chad"},{"id":"TF","text":"French Southern Territories"},{"id":"TG","text":"Togo"},{"id":"TH","text":"Thailand"},{"id":"TJ","text":"Tajikistan"},{"id":"TK","text":"Tokelau"},{"id":"TL","text":"Timor-Leste"},{"id":"TM","text":"Turkmenistan"},{"id":"TN","text":"Tunisia"},{"id":"TO","text":"Tonga"},{"id":"TP","text":"East Timor"},{"id":"TR","text":"Turkey"},{"id":"TT","text":"Trinidad and Tobago"},{"id":"TV","text":"Tuvalu"},{"id":"TW","text":"Taiwan"},{"id":"TZ","text":"Tanzania"},{"id":"UA","text":"Ukraine"},{"id":"UG","text":"Uganda"},{"id":"UK","text":"United Kingdom"},{"id":"UM","text":"United States Minor Outlying Islands"},{"id":"US","text":"United States"},{"id":"UY","text":"Uruguay"},{"id":"UZ","text":"Uzbekistan"},{"id":"VA","text":"Vatican City State (Holy See)"},{"id":"VC","text":"Saint Vincent and the Grenadines"},{"id":"VE","text":"Venezuela"},{"id":"VG","text":"Virgin Islands (British)"},{"id":"VI","text":"Virgin Islands (U.S.)"},{"id":"VN","text":"Viet Nam"},{"id":"VU","text":"Vanuatu"},{"id":"WF","text":"Wallis and Futuna"},{"id":"WS","text":"Samoa"},{"id":"YE","text":"Yemen"},{"id":"YT","text":"Mayotte"},{"id":"YU","text":"Yugoslavia (former)"},{"id":"ZA","text":"South Africa"},{"id":"ZM","text":"Zambia"},{"id":"ZR","text":"Zaire (former)"},{"id":"ZW","text":"Zimbabwe"},{"id":"BIZ","text":"Business"},{"id":"COM","text":"Commercial"},{"id":"EDU","text":"US Educational"},{"id":"GOV","text":"US Government"},{"id":"INT","text":"International"},{"id":"MIL","text":"US Military"},{"id":"NET","text":"Network"},{"id":"ORG","text":"Nonprofit Organization"},{"id":"PRO","text":"Professional Services"},{"id":"AERO","text":"Aeronautic"},{"id":"ARPA","text":"Arpanet Technical Infrastructure"},{"id":"COOP","text":"Cooperative"},{"id":"INFO","text":"Info Domain"},{"id":"NAME","text":"Personal Name"},{"id":"NATO","text":"North Atlantic Treaty Organization"}]';

// The object that the JSON string should represent, can use this as it is if you want.
testData.webSites = [
	{
		id: 1,
		text: 'Delicious',
		image: 'testData/icons/Delicious.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 2,
		text: 'Digg',
		image: 'testData/icons/Digg.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 3,
		text: 'Flickr',
		image: 'testData/icons/Flickr.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 4,
		text: 'MySpace',
		image: 'testData/icons/MySpace.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 5,
		text: 'Youtube',
		image: 'testData/icons/Youtube.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 6,
		text: 'Reddit',
		image: 'testData/icons/Reddit.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 7,
		text: 'StumbleUpon',
		image: 'testData/icons/StumbleUpon.png',
		extra: 'icon from iconspedia.com'
	},
	{
		id: 8,
		text: 'Twitter',
		image: 'testData/icons/Twitter.png',
		extra: 'icon from iconspedia.com'
	}];
	
// JSON string of the above object, just as an example
testData.webSitesJSON = JSON.stringify(testData.webSites);