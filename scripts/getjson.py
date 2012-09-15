import demjson
import urllib2
import unicodedata


base_url = "http://elections.neworganizing.com/en/api/"
base_filepath = "/home/paul/voteridme/voterid.me/src/data/"



def parse_for_lists(target):
        for subtopic in range(0, len(target)):
                new_subtopic = ""
                in_list = False
                for l in target[subtopic]["fact"].splitlines():
			l = l.strip()
			if len(l) == 0:
				continue
                        if not in_list and l[0] == "*":
                                in_list = True
                                new_subtopic += "<ul>\r\n"
                        if in_list and l[0] != "*":
                                in_list = False
                                new_subtopic += "</ul>\r\n"
                                new_subtopic += l + "\r\n"
                        elif l[0] == "*":
                                new_subtopic += "<li>" + l[1:] + "</li>\r\n"
			else:
				new_subtopic += l + "\r\n"
		if in_list:
			new_subtopic += "</ul>"
                target[subtopic]["fact"] = new_subtopic
        return target

	
# Populate list of states
states_f = open(base_filepath + "states.json")
states = states_f.read()
states_f.close()
state_list = demjson.decode(states).keys()

for state in state_list:
	try:
		print "Attempting to acquire and update %s" % state
		raw_data = urllib2.urlopen(base_url + state + "/").read()
		data = demjson.decode(raw_data)
		data = data["voter-id-and-challenges"]
		data["voter-id"]["subtopics"] = parse_for_lists(data["voter-id"]["subtopics"])
		data["challenges-to-voters-at-the-polling-place"]["subtopics"] = parse_for_lists(data["challenges-to-voters-at-the-polling-place"]["subtopics"]) 
		raw_data = str(unicodedata.normalize('NFKD', demjson.encode(data)).encode('ascii','ignore'))
		state_json_f = open(base_filepath + state + ".json", 'w')
		state_json_f.write(raw_data)
		state_json_f.close()
	except Exception, e:
		print "%s failed: %s" % (state, str(e))
