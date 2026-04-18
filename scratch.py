import urllib.request
import re

wiki_pages = {
    'LIC': 'https://en.wikipedia.org/wiki/Life_Insurance_Corporation',
    'HDFC ERGO': 'https://en.wikipedia.org/wiki/HDFC_ERGO_General_Insurance_Company',
    'ICICI Lombard': 'https://en.wikipedia.org/wiki/ICICI_Lombard',
    'Tata AIG': 'https://en.wikipedia.org/wiki/Tata_AIG_General_Insurance_Company',
    'Bajaj Allianz': 'https://en.wikipedia.org/wiki/Bajaj_Allianz_Life_Insurance',
    'Star Health': 'https://en.wikipedia.org/wiki/Star_Health_and_Allied_Insurance',
    'Max Life': 'https://en.wikipedia.org/wiki/Max_Life_Insurance',
    'HDFC Life': 'https://en.wikipedia.org/wiki/HDFC_Life'
}

for name, url in wiki_pages.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'src="(\/\/upload\.wikimedia\.org\/wikipedia\/(en|commons)\/thumb\/[^"]+\.png)"', html)
        if match:
            print(f"{name}: https:{match.group(1)}")
        else:
            print(f"{name}: NO MATCH")
            
        # Specific search for base SVG/PNG files (from scratch2.py)
        match_base = re.search(r'\"(\/\/upload\.wikimedia\.org\/wikipedia\/(en|commons)\/[^\"]+\.(svg|png))\"', html)
        if match_base:
            print(f"  Base IMG: https:{match_base.group(1)}")
            
    except Exception as e:
        print(f"{name}: ERROR {e}")
