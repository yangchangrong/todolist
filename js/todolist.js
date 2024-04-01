$(function() {
    load();
    //    1.给输入框添加键盘的enter事件，当keycode=13,动态添加li到ol中
    $("#title").on("keydown", function(event) {
            if (event.keyCode === 13) {
                console.log("输入的值=",$(this).val());
                //2.将输入框中的数据存入到localstorage中，封装函数setData()
                var exists = getData();
                var add = {
                    title: $(this).val(),
                    done: false
                }
                console.log("add=",add);
                console.log("exists=",exists);
                exists.push(add);
                console.log("exists=",exists);
                setData(exists);
                //3.加载localStorage数据到ol中
                load();
                $(this).val("");
            }
    });
    //  对ol中的input绑定点击事件
    $("ol,ul").on("click","input",function () {
        // 先获取本地数据
        var data = getData();
        // 获取ol li input 将checked属性更新到具体数据
        var index = $(this).siblings("a").attr("id")
        data[index].done = $(this).prop("checked");
        // 保存数据，刷新页面
        setData(data);
        load();
    });
     //  对ol ul中的a绑定点击事件，点击完成之后，进行删除
     $("ol,ul").on("click","a",function () {
        // 先获取本地数据
        var data = getData();
        // 获取ol,ul a 对应具体数据删除
        var index = $(this).siblings("a").attr("id")
        data.splice(index,1);
        
        // 保存数据，刷新页面
        setData(data);
        load();
    });

    // 将数组对象存入到localStorage中
    function setData(data) {
         // 更新localStorage的值
         localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 获取localStorage数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (null === data || data === "") {
            return [];
        }else{
           return JSON.parse(data);
        }

    }
    // 将localStorage中todolist数据渲染到页面
    function load() {
        var data = getData();
        console.log("load data=",data);
        // 加载数据的时候准备两个变量记录done/not done 数量
        var todoCount = 0;
        var doneCount = 0;
        // 先清空ol里面的li
        $("ol,ul").empty();
        if (null !== data) {
            // 遍历数据,i作为自定义id属性
            $.each(data, function(i, n) {
                if (!n.done) {
                    $("ol").prepend("<li> <input type='checkbox' > <p>" + n.title + "</p><a href='javascript:;' id="+i+"></a></li>");
                    todoCount ++;
                }else{
                    $("ul").prepend("<li> <input type='checkbox' checked='checked' > <p>" + n.title + "</p><a href='javascript:;' id="+i+"></a></li>");
                    doneCount ++;
                }    
            });   
        }
        //每次加载的时候，都去更新数量
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }



})