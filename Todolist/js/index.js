$(function () {
    $(".footer").hide()

    function obj(num, ele, done) {
        if (done) {
            ele = "已完成"
        }
        var lis = $("<li><button class='check'></button><p class='content'>" + ele + "</p><button class='del'>X</button></li>")
        lis.attr("data-index", num);
        $(".liu").prepend(lis)
    }

    function loadData() {
        $(".liu").empty();
        var data = getData();
        if (data.length != 0) {
            $(data).each(function (num, ele) {
                obj(num, ele.title, ele.done);
            })
            $(".liu").slideDown();
            done();
            // $(".num").text(data.length + "个待办事项")
            $(".footer").slideDown()
        } else {
            $(".liu").slideUp();
            $(".footer").slideUp()
        }
        $(data).each(function (num, ele) {
            if (ele.done) {
                var lis = $("li[data-index=" + num + "]");
                lis.addClass("completed")
                T(lis.children(".check"));
            }
        })
    }

    loadData();

    function done() {
        var data = getData();
        var n = 0;
        $(data).each(function (num, ele) {
            if (!ele.done)
                n++;
        })
        $(".num").text(n + "个待办事项")
    }

    $(".int").on("focus", function () {
        $("html body").on("keyup", function (e) {
            if (e.keyCode == 13) {
                if ($(".int").val() != "") {
                    var data = getData()
                    data.push({title: $(".int").val(), done: false});
                    setData(data);
                    loadData();
                    $(".int").val("");
                    $(".liu").slideDown();
                } else return false;
            }
        })
    })

    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != "" && data != null)
            return JSON.parse(data);
        else return [];
    }

    function setData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }

    $(".sub").on("click", function () {
        if ($(".int").val() == "")
            return false;
        else {
            var data = getData();
            data.push({title: $(".int").val(), done: false});
            setData(data);
            loadData();
            $(".int").val("");
            $(".footer").show();
        }
    })
    $(".liu").on("click", ".check", function () {
        $(this).parent().toggleClass("completed");
        var data = getData();
        var num = $(this).parent().attr("data-index");
        if ($(this).parent().hasClass("completed")) {
            T($(this));
            data[num].done = true;
            setData(data);
            $(this).siblings("p").text("已完成");
        } else {
            F($(this));
            data[num].done = false;
            setData(data);
            $(this).siblings("p").text(data[num].title);
        }
        done();
    })

    function T(ele) {
        ele.css({"background-image": "url('./images/check.png')", "border": "none"})
        ele.siblings().css({"color": "#fff"})
    }

    function F(ele) {
        ele.css({"background-image": "", "border": "2px solid #494a4b"})
        ele.siblings().css({"color": "#494a4b"})
    }

    $(".liu").on("click", ".del", function () {
        var num = $(this).parent().attr("data-index");
        var data = getData();
        data.splice(num, 1);
        setData(data);
        loadData();

    })
    var flog = true;
    $(".all").on("click", function () {
        var data = getData();
        if (flog) {
            $(".liu li").addClass("completed");
            for (var i = 0; i < data.length; i++) {
                data[i].done = true;
            }
            setData(data);
            $(".content").text("已完成");
            T($(".check"));
            flog = false;
            done();
        } else {
            $(".liu li").removeClass("completed");
            for (var i = 0; i < data.length; i++) {
                data[i].done = false;
            }
            setData(data);
            $(data).each(function (num, ele) {
                $("li[data-index=" + num + "] p").text(ele.title);
            })
            F($(".check"));
            flog = true;
            done();
        }

    })
})