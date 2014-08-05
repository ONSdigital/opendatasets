var user = new Gh3.User("onsdigital")
  , updated = $("h2")
  ,	datalist = $("ul");
  

var repo = new Gh3.Repository("opendatasets", user);

repo.fetch(function (err, res) {
  if(err) { throw "outch ..." }
  repo.fetchBranches(function (err, res) {
    if(err) { throw "outch ..." }

    var master = repo.getBranchByName("master");
    master.fetchContents(function (err, res) {
      if(err) { throw "outch ..." }

      var dir = master.getDirByName('data');
	  dir.fetchContents(function (err, res) {
      	if(err) { throw "outch ..." }
	  	var datasets = dir.getContents();
		var arrayLength = datasets.length;
		for (var i = 0; i < arrayLength; i++) {
		    if (datasets[i].type == "dir"){
				var pkg = dir.getDirByName(datasets[i].name);
				var htmlurl = datasets[i].html_url;
				pkg.fetchContents(function (err, res) {
				        if(err) { throw "outch ..." }
						var  myFile = pkg.getFileByName("datapackage.json");
						myFile.fetchContent(function (err, res) {
						        if(err) { throw "outch ..." }
						        var json = myFile.getRawContent();
								var data = JSON.parse(json);
								var item = $('<a></a>').attr("href",htmlurl);
								item.append('<li>'+data.title);
								datalist.append(item);
						});
				
		        });
			}
		}
	});
  });
 });
});



