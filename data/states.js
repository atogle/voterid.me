var VoterId = VoterId || {};

(function(V){
  V.states = [
    {abbr: 'AL', name: 'Alabama', url: 'data/AL.json', strictness: 'non_photo', statehotline: '334-242-7210', statedemhotline: '(334) 262-2221', stategophotline: '205.212.5900', statedmv: 'http://www.ador.state.al.us/motorvehicle/index.html'},
    {abbr: 'AK', name: 'Alaska', url: 'data/AK.json', strictness: 'non_photo', statehotline: '501-682-1010', statedemhotline: '(907) 258-3050', stategophotline: '(907) 276-4467', statedmv: 'http://doa.alaska.gov/dmv/dmvhome.htm'},
    {abbr: 'AZ', name: 'Arizona', url: 'data/AZ.json', strictness: 'non_photo', statehotline: '602-542-8683', statedemhotline: '(602)298-4200', stategophotline: ' 602.957.7770', statedmv: 'http://www.azdot.gov/MVD/'},
    {abbr: 'AR', name: 'Arkansas', url: 'data/AR.json', strictness: 'non_photo', statehotline: '501-682-5070', statedemhotline: ' 501.374.2361', stategophotline: ' (501) 372-7301', statedmv: 'http://www.arkansas.gov/dfa/driver_services/ds_license.html'
},
    {abbr: 'CA', name: 'California', url: 'data/CA.json', strictness: 'none', statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.dmv.ca.gov/'},
    {abbr: 'CO', name: 'Colorado', url: 'data/CO.json', strictness: 'non_photo', statehotline: '303-894-2200 ext. 6307 ', statedemhotline: '(303) 623-4762', stategophotline: '303.758.3333', statedmv: 'http://www.colorado.gov/revenue/dmv'},
    {abbr: 'CT', name: 'Connecticut', url: 'data/CT.json', strictness: 'non_photo', statehotline: '860-509-6100', statedemhotline: ' 860 560-1775', stategophotline: ' (860) 422-8211' , statedmv: 'http://www.ct.gov/dmv/site/default.asp'},
    {abbr: 'DE', name: 'Delaware', url: 'data/DE.json', strictness: 'non_photo', statehotline: '302-739-4277', statedemhotline: '(302) 328-9036 - New Castle County<br> (800) 685-5544 - Kent & Sussex Counties', stategophotline: '<a href="http://www.delawaregop.com">http://www.delawaregop.com</a>', statedmv: 'http://www.dmv.de.gov/'},
    {abbr: 'DC', name: 'District of Columbia', url: 'data/DC.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://dmv.dc.gov/main.shtm'},
    {abbr: 'FL', name: 'Florida', url: 'data/FL.json', strictness: 'photo', statehotline: '1-866-308-6739', statedemhotline: '850.222.3411', stategophotline: '(850) 222-7920', statedmv: 'http://www.flhsmv.gov/'},
    {abbr: 'GA', name: 'Georgia', url: 'data/GA.json', strictness: 'strict_photo', statehotline: '404-656-2871 ', statedemhotline: '(678) 278-2012', stategophotline: '(404) 257-5559', statedmv: 'http://www.ga.gov/00/channel_title/0,2094,4802_4963,00.html' },
    {abbr: 'HI', name: 'Hawaii', url: 'data/HI.json', strictness: 'photo', statehotline: '808-453-8683', statedemhotline: '(855) 596-2980', stategophotline: '(808) 593-8180', statedmv: 'http://www.co.honolulu.hi.us/csd/'},
    {abbr: 'ID', name: 'Idaho', url: 'data/ID.json', strictness: 'photo', statehotline: '208-334-2852', statedemhotline: '(208) 336-1815', stategophotline: '208-343-6405', statedmv: 'http://www.itd.idaho.gov/dmv/index.htm'},
    {abbr: 'IL', name: 'Illinois', url: 'data/IL.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.sos.state.il.us/services/services_motorists.html'},
    {abbr: 'IN', name: 'Indiana', url: 'data/IN.json', strictness: 'strict_photo', statehotline: '866.IN.1.VOTE', statedemhotline: '317.231.7100', stategophotline: '317-635-7561', statedmv: 'http://www.state.in.us/bmv/'},
    {abbr: 'IA', name: 'Iowa', url: 'data/IA.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.iowadot.gov/mvd/index.htm'},
    {abbr: 'KS', name: 'Kansas', url: 'data/KS.json', strictness: 'strict_photo',  statehotline: '785-296-4561', statedemhotline: '785-234-0425', stategophotline: ' (785) 234-3456 ', statedmv: 'http://www.ksrevenue.org/vehicle.html'},
    {abbr: 'KY', name: 'Kentucky', url: 'data/KY.json', strictness: 'non_photo', statehotline: '502-573-7100', statedemhotline: '(502) 695-4828', stategophotline: '502.875.5130', statedmv: 'http://www.kytc.state.ky.us'},
    {abbr: 'LA', name: 'Louisiana', url: 'data/LA.json', strictness: 'photo', statehotline: '225.922.0900', statedemhotline: '(225) 336-4155', stategophotline: '(225) 389-4495', statedmv: 'http://omv.dps.state.la.us/'},
    {abbr: 'ME', name: 'Maine', url: 'data/ME.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.maine.gov/sos/bmv/'},
    {abbr: 'MD', name: 'Maryland', url: 'data/MD.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.mva.state.md.us/'},
    {abbr: 'MA', name: 'Massachusetts', url: 'data/MA.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.mass.gov/rmv/'},
    {abbr: 'MI', name: 'Michigan', url: 'data/MI.json', strictness: 'photo', statehotline: '(517) 373-2540', statedemhotline: '(517) 371-5410', stategophotline: '517-487-5413', statedmv: 'http://www.michigan.gov/sos'},
    {abbr: 'MN', name: 'Minnesota', url: 'data/MN.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false , statedmv: 'http://www.dps.state.mn.us/dvs/index.html'},
    {abbr: 'MO', name: 'Missouri', url: 'data/MO.json', strictness: 'non_photo',  statehotline: '(573) 751-2301 ', statedemhotline: '(573) 636-5241', stategophotline: '573-636-3146', statedmv: 'http://www.dps.state.ms.us/dps/dps.nsf/webpages/dlinfo_DriverLocationLocation?OpenDocument' },
    {abbr: 'MS', name: 'Mississippi', url: 'data/MS.json', strictness: 'none', statehotline: '1-800-829-6786', statedemhotline: '(601) 969-2913', stategophotline: '601-948-5191', statedmv: 'http://dor.mo.gov/mvdl/' },
    {abbr: 'MT', name: 'Montana', url: 'data/MT.json', strictness: 'non_photo',  statehotline: '1-888-884-8683', statedemhotline: '406-442-9520', stategophotline: '406.442.6469' , statedmv: 'http://doj.mt.gov/driving/default.asp'},
    {abbr: 'NE', name: 'Nebraska', url: 'data/NE.json', strictness: 'none', statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.dmv.state.ne.us/'},
    {abbr: 'NV', name: 'Nevada', url: 'data/NV.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.dmvnv.com'},
    {abbr: 'NH', name: 'New Hampshire', url: 'data/NH.json', strictness: 'photo', statehotline: '603-271-3242', statedemhotline: '(603) 225-6899', stategophotline: '(603) 225-9341', statedmv: 'http://www.nh.gov/safety/divisions/dmv/'},
    {abbr: 'NJ', name: 'New Jersey', url: 'data/NJ.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.state.nj.us/mvs/'},
    {abbr: 'NM', name: 'New Mexico', url: 'data/NM.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.mvd.newmexico.gov/'},
    {abbr: 'NY', name: 'New York', url: 'data/NY.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.dmv.ny.gov/'},
    {abbr: 'NC', name: 'North Carolina', url: 'data/NC.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.ncdot.org/DMV/'},
    {abbr: 'ND', name: 'North Dakota', url: 'data/ND.json', strictness: 'non_photo', statehotline: '701-328-4146', statedemhotline: '701-255-0460', stategophotline: '(701) 255-0030', statedmv: 'http://www.dot.nd.gov/public/licensing.htm'},
    {abbr: 'OH', name: 'Ohio', url: 'data/OH.json', strictness: 'non_photo', statehotline: '(614) 466-2655', statedemhotline: '614-221-6563', stategophotline: '614.228.2481' , statedmv: 'http://www.bmv.ohio.gov/' },
    {abbr: 'OK', name: 'Oklahoma', url: 'data/OK.json', strictness: 'non_photo',  statehotline: ' 405-521-2391', statedemhotline: '(405) 427-3366', stategophotline: '(405) 528-3501', statedmv: 'http://www.dps.state.ok.us/dls/'},
    {abbr: 'OR', name: 'Oregon', url: 'data/OR.json', strictness: 'none',   statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.oregon.gov/ODOT/DMV/'},
    {abbr: 'PA', name: 'Pennsylvania', url: 'data/PA.json', strictness: 'strict_photo', statehotline: '1-877-VOTESPA', statedemhotline: '(717) 920-8470', stategophotline: '(717) 234-4901', statedmv: 'http://www.dmv.state.pa.us/'},
    {abbr: 'RI', name: 'Rhode Island', url: 'data/RI.json', strictness: 'non_photo', statehotline: '(401) 222-2345', statedemhotline: '(401) 272-3367', stategophotline: '(401) 732-8282', statedmv: 'http://www.dmv.ri.gov/'},
    {abbr: 'SC', name: 'South Carolina', url: 'data/SC.json', strictness: 'non_photo', statehotline: ' (803) 734-9060', statedemhotline: '(803) 799-7798 ', stategophotline: '(803) 988-8440', statedmv: 'http://www.scdmvonline.com'},
    {abbr: 'SD', name: 'South Dakota', url: 'data/SD.json', strictness: 'photo', statehotline: '(605) 773-3537', statedemhotline: '605.271.5405', stategophotline: '605-224-7347', statedmv: 'http://www.state.sd.us/drr2/motorvehicle/index.htm'},
    {abbr: 'TN', name: 'Tennessee', url: 'data/TN.json', strictness: 'strict_photo', statehotline: '615-741-7956', statedemhotline: ' (615) 327-9779', stategophotline: '(615) 269-4260', statedmv: 'http://www.state.tn.us/safety/'},
    {abbr: 'TX', name: 'Texas', url: 'data/TX.json', strictness: 'non_photo',  statehotline: '512.463.5650', statedemhotline: '512.478.9800', stategophotline: '512.477.9821', statedmv: 'http://www.txdmv.gov/index.htm'},
    {abbr: 'UT', name: 'Utah', url: 'data/UT.json', strictness: 'non_photo',  statehotline: '801.538.1041', statedemhotline: '(801) 328-1212', stategophotline: '(801) 533-9777', statedmv: 'http://www.dmv.utah.gov/'},
    {abbr: 'VT', name: 'Vermont', url: 'data/VT.json', strictness: 'none',   statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://dmv.vermont.gov/'},
    {abbr: 'VA', name: 'Virginia', url: 'data/VA.json', strictness: 'non_photo', statehotline: '804 864-8901 ', statedemhotline: '804-644-1966', stategophotline: '804-780-0111' , statedmv: 'http://www.dmv.state.va.us/'},
    {abbr: 'WA', name: 'Washington', url: 'data/WA.json', strictness: 'non_photo', statehotline: '(360) 902-4180', statedemhotline: ' (206) 395-2116 ', stategophotline: '425-460-0570', statedmv: 'http://www.dol.wa.gov/'},
    {abbr: 'WV', name: 'West Virginia', url: 'data/WV.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.transportation.wv.gov/dmv/Pages/default.aspx' },
    {abbr: 'WI', name: 'Wisconsin', url: 'data/WI.json', strictness: 'none',statehotline: '(608) 266-8005', statedemhotline: '(608) 255-5172', stategophotline: '(608) 257-4765' , statedmv: 'http://www.dot.state.wi.us/drivers/index.htm'},
    {abbr: 'WY', name: 'Wyoming', url: 'data/WY.json', strictness: 'none',  statehotline: false, statedemhotline: false, stategophotline: false, statedmv: 'http://www.dot.state.wy.us/wydot/'}
  ];
})(VoterId);