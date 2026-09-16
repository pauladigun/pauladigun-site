#!/usr/bin/env python3
"""Fetch Google Scholar profile -> public/scholar.json

Local (free):   pip install scholarly && python scripts/update_scholar.py
CI (reliable):  set SERPAPI_KEY env var (free key at https://serpapi.com)
"""
import json, os, sys, time

AUTHOR_ID = "7uxmezsAAAAJ"
OUT = os.path.join("public", "scholar.json")


def via_serpapi(key):
    import urllib.parse, urllib.request
    base = "https://serpapi.com/search.json"

    def fetch(p):
        p = dict(p); p["api_key"] = key
        with urllib.request.urlopen(base + "?" + urllib.parse.urlencode(p), timeout=60) as r:
            return json.load(r)

    arts, start, metrics = [], 0, {}
    while True:
        d = fetch({"engine": "google_scholar_author", "author_id": AUTHOR_ID,
                   "start": start, "num": 100, "sort": "pubdate"})
        if d.get("error"):
            raise RuntimeError(d["error"])
        if start == 0:
            tbl = d.get("cited_by", {}).get("table", [])

            def g(k):
                for row in tbl:
                    if k in row:
                        return row[k].get("all", 0)
                return 0
            metrics = {"citations": g("citations"), "hIndex": g("h_index"), "i10Index": g("i10_index")}
        batch = d.get("articles", [])
        arts += batch
        if len(batch) < 100:
            break
        start += 100
        time.sleep(1)

    pubs = [{
        "title": a.get("title", ""),
        "authors": a.get("authors", ""),
        "journal": a.get("publication", ""),
        "year": int(a["year"]) if str(a.get("year", "")).isdigit() else "",
        "citations": (a.get("cited_by") or {}).get("value", 0) or 0,
        "link": a.get("link", ""),
    } for a in arts]
    return metrics, pubs


def via_scholarly():
    from scholarly import scholarly
    a = scholarly.search_author_id(AUTHOR_ID)
    a = scholarly.fill(a, sections=["basics", "indices", "publications"])
    metrics = {"citations": a.get("citedby", 0), "hIndex": a.get("hindex", 0), "i10Index": a.get("i10index", 0)}
    pubs = []
    for p in a.get("publications", []):
        b = p.get("bib", {})
        yr = b.get("pub_year", "")
        link = ""
        if p.get("author_pub_id"):
            link = ("https://scholar.google.com/citations?view_op=view_citation&hl=en&user="
                    + AUTHOR_ID + "&citation_for_view=" + p["author_pub_id"])
        pubs.append({
            "title": b.get("title", ""),
            "authors": b.get("author", ""),
            "journal": b.get("citation", b.get("venue", "")),
            "year": int(yr) if str(yr).isdigit() else "",
            "citations": p.get("num_citations", 0) or 0,
            "link": link,
        })
    return metrics, pubs


def main():
    key = os.environ.get("SERPAPI_KEY")
    metrics, pubs = via_serpapi(key) if key else via_scholarly()
    pubs.sort(key=lambda x: ((x["year"] if isinstance(x["year"], int) else 0), x["citations"]), reverse=True)
    os.makedirs("public", exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"updated": time.strftime("%Y-%m-%d"), "metrics": metrics, "publications": pubs},
                  f, indent=2, ensure_ascii=False)
    print("wrote %s - %d publications, metrics=%s" % (OUT, len(pubs), metrics))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("ERROR:", e)
        sys.exit(1)
