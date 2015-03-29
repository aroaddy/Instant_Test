function shuffle(array) {
	 var counter = array.length, temp, index;

	 // While there are elements in the array
	 while (counter > 0) {
	 // Pick a random index
	 index = Math.floor(Math.random() * counter);

	 // Decrease counter by 1
	 counter--;

	 // And swap the last element with it
	 temp = array[counter];
	 array[counter] = array[index];
	 array[index] = temp;
	 }

	 return array;
}


function CWeight (weight) {
	if (weight.slice(0, 1) == "-") {
		var wei = (weight.slice(1, weight.length - 1))/100
	} else{
		var wei = (weight.slice(0, weight.length - 1))/100
	};
	return wei;
}
var Test = function (data) {
	this.data = data;
	var muls = new Array();
	var section = data.examination.sections.section.question;

	//Creates a random list of the questions
	shuffle(section);
	var properties = function (data){
	 	this.duration = data.examination.ATTRduration;
	 	this.kind = data.examination.ATTRkind;
	 	this.draw = data.examination.ATTRdraw;
	 	this.instruction = data.examination.ATTRinstruction;
	 	this.subject = data.examination.ATTRsubject;
 	}

	 this.children = muls;
	 this.section = section;
	 this.properties = new properties(data);
};

Test.prototype.draw = function (mode) {
	 $("#test").html('<div id="test" class="col-lg-8"></div>');
	 var html = '';
	 this.children = new Array();
		for (var i = 0; i < this.section.length; i++) {
			var mul = new Multiple(this.section[i], i + 1, mode);
			this.children.push(mul);
			html = html + mul.draw("init");
		};
		//console.log(this.children);
	 $('#test').append(html);
};

Test.prototype.choice = function (choice) {
	var arr = choice.split(":")
	this.children[arr[0] - 1].choice(arr[1]);
	//this.children[arr[0] - 1].mark();
	//console.log("Your choice for Question " + arr[0] + " is " + String.fromCharCode(65 + new Number(arr[1])));
};

Test.prototype.mark = function() {
	var mark = 0;
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].mark()
		mark = mark + this.children[i].score
	};
	mark = (mark/this.children.length) * 100
	

	$("#test").html('<div id="test" class="col-lg-8"></div>');
	 var html = '';
		for (var i = 0; i < this.children.length; i++) {
			html = html + this.children[i].draw("mark");
		};
	$('#test').append(html);

	return mark.toFixed(1);
};


var sample = 
{"examination":{"ATTRduration":"0:15:0","ATTRkind":"Bank","ATTRdraw":"20","ATTRinstruction":"choose one or more correct options from the following","ATTRsubject":"Female Reproductive System","sections":{"section":{"ATTRformat":"multiple choice","ATTRinstruction":"make a choice from the following options","question":[{"ATTRnumber":"16","text":{"ATTRtype":"text","$":"The endometrium:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"is constantly changing its histological\nappearance throughout the menstrual cycle"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"is influenced by estrogen"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"is influenced by progesterone"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"has a fairly constant basal layer"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"has a functional layer, which reaches its greatest development when the\nuterus is most ready for implantation"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"17","text":{"ATTRtype":"text","$":"Coiled arteries of the endometrium:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"are found in the functional portion"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"develop anew each menstrual cycle"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"are especially well developed in the first half of the menstrual cycle"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"constrict and close off blood supply at the end of the secretory phas"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"are present in the cervix uteri"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"21","text":{"ATTRtype":"text","$":"Gonadotrapins are secreted by the:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"hypothalamus"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"adenohypophysis"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"thyroid"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"adrenal cortex"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"placenta"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"5","text":{"ATTRtype":"text","$":"The corpora lutea:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"secrete progesterone"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"are yellow in appearance"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"develop mainly from granulose cells"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"develop under the influence of luteinizing hormone (LH)"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"have lipid-rich cells"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"7","text":{"ATTRtype":"text","$":"Corpora albicantes are:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"found in fetal ovaries"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"found in ovaries of young girls"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"found in post-menopausal ovaries"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"degenerate corpora lutea"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"mainly composed of fibrous connective tissue"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"2","text":{"ATTRtype":"text","$":"Primordial follicles in the ovary:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"appear during the embryonic period"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"increase in number after birth"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"contain secondary oocytes (oocyte II)"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"are concentrated in the area of the hilus"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"can complete their development through to ovulation at puberty"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"9","text":{"ATTRtype":"text","$":"The zona pellucida is:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"acidophilic"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"basophilic"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"homogeneous"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"acellular"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"composed of glycoproteins"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"14","text":{"ATTRtype":"text","$":"Stratified squamous epithelium may be found\nin the:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"oviduct"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"cervic uteri"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"vagina"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"endometrium"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"peritoneum"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"10","text":{"ATTRtype":"text","$":"Fertilization usually occurs in the:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"ovary"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"peritoneal cavity"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"100.00%","$":"oviduct"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"vagina"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"uterus"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"8","text":{"ATTRtype":"text","$":"The zona pellucida of Ggraafian follicles:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"surrounds the oocyte"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"is adjacent to the theca interna"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"is in direct contact with the liquor folliculi"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"stains PAS-position"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"is penetrated by oocytes microvilli"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"20","text":{"ATTRtype":"text","$":"The contraceptive pill usually contains synthetic analogues of:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"FSH"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"LH"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"progesterone"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"estrogen"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"oxytocin"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"12","text":{"ATTRtype":"text","$":"The epithelium lining the oviduct is:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"simple columnar"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"50.00%","$":"ciliated"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"stratified"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"pseudostratified"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"transitional"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"4","text":{"ATTRtype":"text","$":"Corpora lutea develop:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"following ovulation"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"from the theca folliculi only"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"to their greatest degree during pregnancy"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"into corpora albicans"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"20.00%","$":"into steroid secreting glands"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"18","text":{"ATTRtype":"text","$":"During menstruation:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"progesterone levels are low"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"estrogen levels are low"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"the basal layer of the endometrium disintegrates"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"urterine glands break down"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"uterine blood clots are common"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"3","text":{"ATTRtype":"text","$":"Associated with Graafian follicles are:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"zona pellucida"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"cumulus oophorus"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"theca folliculi"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"25.00%","$":"liquor folliculi (follicular liquid)"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"tunica albuginea"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"11","text":{"ATTRtype":"text","$":"Follicular atresia may occur:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"at any stage in the development of a follicle"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"only in mature Graafian follicles"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"immediatlely after birth"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"during pregnancy"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"only after the menopause"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"6","text":{"ATTRtype":"text","$":"The corpora lutea possess:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"an oocyte"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"granulose lutein cells"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"theca lutein cells"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"a fluid-filled cavity"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"many blood capillaries"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"13","text":{"ATTRtype":"text","$":"The wall of the oviduct possesses:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"mucosa"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"submucosa"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"glands"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"smooth muscle"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"serosa"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"15","text":{"ATTRtype":"text","$":"Which structure prevents entry of further spermatozoa after one has penetrated the oocyte?"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"cumulus oophorus"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"100.00%","$":"zona pellucida"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"theca interna"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"tunica albuginea"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"theca externa"}]},"reason":{"ATTRtype":"text"}},{"ATTRnumber":"19","text":{"ATTRtype":"text","$":"The cervix uteri:"},"options":{"option":[{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"is lined with endometrium that changes its appearance according to the\nstage of the menstrual cycle"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"has in certain areas simple, columnar, secretory epithelium"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"has large, branching mucous glands"},{"ATTRtype":"text","ATTRanswer":"false","ATTRweight":"-10.00%","$":"has a well-developed muscular wall as in the fundus"},{"ATTRtype":"text","ATTRanswer":"true","ATTRweight":"33.33%","$":"dilates during parturition as a result of hormonal influences"}]},"reason":{"ATTRtype":"text"}}]}}}}

	
var Multiple = function (data, pos, mode) {
	var choices = new Array();
	var score = 0;
	var html = "";
	 //stores the multiple choice question object
	var text = function (data){
	 	this.type = data.ATTRtype;
	 	this.value = data.$;
	}

	 //stores the multiple choice answer's explanation
	var reason = function (data){
	 	this.type = data.ATTRtype;
	 	this.value = data.$;
	}

	 //stores the multiple choice option
 	var option = function (data){
	 	this.type = data.ATTRtype;
	 	this.value = data.$;
	 	this.answer = data.ATTRanswer;
	 	this.weight = data.ATTRweight;
 	}

 	 //function that creates the HTML for the multiple choice object
 	 //Takes in objects gained from the preceding functions
	this.data = data;
	this.num = pos;

	var ops = new Array();
	for (var i = 0; i < data.options.option.length; i++) {
		ops.push(new option(data.options.option[i]));
	};

	//this.options = shuffle(ops);
	this.options = ops;
	this.choices = choices;
	this.score = score;
	this.text = new text(data.text);
	this.reason = new reason(data.reason);
	this.html = html;//new draw(mode, pos, this.text, this.options, this.reason);
};


Multiple.prototype.draw = function (mode){
	var opts = '<a class="CLASS" role="button" id="ID"><strong><em>LETTER. </em></strong>TEXT</a>'
	var que = '<div id="ID" class="panel panel-MODE"><div class="panel-heading"><h2 class="panel-title"></h2><h4><em>NUM. </em>TEXT</h4></div><div class="panel-body"><div class="list-group">OPTS</div></div></div>'
	var mtext = "";
 	var result	="";
	
	if (mode == "init") {
		for (var i = 0; i < this.options.length; i++) {
			var opt = opts;
			opt = opt.replace("CLASS", "list-group-item");
			opt = opt.replace("ID", this.num + ':' + i);
			opt = opt.replace("LETTER", String.fromCharCode(65 + i));
			opt = opt.replace("TEXT", this.options[i].value);
			mtext = mtext + opt;
		};
		que = que.replace("ID", "mul"  + this.num);
		que = que.replace("MODE", "info");
		que = que.replace("NUM", this.num);
		que = que.replace("TEXT", this.text.value);
		que = que.replace("OPTS", mtext);
		this.html = que;
		result = que;
	}; 	 


	if (mode == "mark") {
		for (var i = 0; i < this.options.length; i++) {
			var opt = opts;
			opt = opt.replace("ID", this.num + ':' + i);
			opt = opt.replace("LETTER", String.fromCharCode(65 + i));
			
			
			if (this.choices.indexOf(i.toString()) == -1) {
				opt = opt.replace("CLASS", "list-group-item");
			} else{
				opt = opt.replace("CLASS", "list-group-item active");
			};

			
			if (this.options[i].answer == "true") {
 	 			opt = opt.replace("TEXT", this.options[i].value + '<span class="glyphicon glyphicon-ok"></span>');	
 	 		}
			if (this.options[i].answer == "false") {
				opt = opt.replace("TEXT", this.options[i].value + '<span class="glyphicon glyphicon-remove"></span>');
			}
			mtext = mtext + opt;
		};

		que = que.replace("ID", "mul"  + this.num);
		
		if (this.score > 0.0) {
		 	 que = que.replace("MODE", "success");
		} else if (this.score < 0.0) {
			que = que.replace("MODE", "danger");
		} else {
			que = que.replace("MODE", "default");
		};
		
		
		que = que.replace("NUM", this.num);
		que = que.replace("TEXT", this.text.value);
		que = que.replace("OPTS", mtext);
		this.html = que;
		result = que;
	}; 	 	
 	 	return result;
};


Multiple.prototype.choice = function (choice) {
	if (this.choices.indexOf(choice) == -1) {
		this.choices.push(choice);
	} else{
		this.choices.splice(this.choices.indexOf(choice), 1);
	};
	//console.log(this);
};

Multiple.prototype.mark = function () {
	var score = 0;
	for (var i = 0; i < this.choices.length; i++) {
		if (this.options[this.choices[i]].answer == "true") {
			score = score + CWeight(this.options[this.choices[i]].weight);
		} else if (this.options[this.choices[i]].answer == "false"){
			score = score - CWeight(this.options[this.choices[i]].weight);
		};
	};
	this.score = score;
};
