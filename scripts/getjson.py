import demjson
import urllib2
import unicodedata


base_url = "http://elections.neworganizing.com/en/api/"
base_filepath = "/home/paul/voteridme/voterid.me/src/data/"


# Populate list of states
states_f = open(base_filepath + "states.json")
states = states_f.read()
states_f.close()
state_list = demjson.decode(states).keys()

for state in state_list:
	try:
		raw_data = urllib2.urlopen(base_url + state + "/").read()
		data = demjson.decode(raw_data)
		data = 	data["voter-id-and-challenges"]
		raw_data = unicodedata.normalize('NFKD',demjson.encode(data)).encode('ascii','ignore')
		state_json_f = open(base_filepath + state + ".json", 'w')
		state_json_f.write(raw_data)
		state_json_f.close()
	except Exception, e:
		print "%s failed: %s" % (state, str(e))
		continue
