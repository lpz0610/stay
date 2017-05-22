/**
 * Created by Steven on 2017/4/30.
 */
$(function () {
    /*�ֲ�ͼ����*/
    $.each($("#main-banner>ul>li"), function (i) {
        // ����li��Ϊÿ��li��ӱ���ͼƬ����̬����li�Ŀ��
        $(this).css({"background":"url('./images/banner"+(i+1)+".jpg') 50% 0% no-repeat", "width": $("#main-banner>ul").width()/($("#main-banner>ul>li").length+1)});
    });

    // ����һ��ͼƬ��̬��¡��ul��β��
    var $firstLi = $("#main-banner>ul>li").eq(0).clone(true);
    $("#main-banner>ul").append($firstLi);

    var timer = null;
    var index = 0; // ���ڼ�¼�ֲ��ĵ�λ����
    var liLength = $("#main-banner>ul>li").length; // li�ĸ���
    var flag = true; // ����һ���������ڼ�¼��ǰ�����Ƿ�ִ�����

    autoplay();

    // ��������Ƴ�ʱͼƬ���ֲ��л� & ����ҳ��ť����ʾ������
    $("#main-banner").mouseover(function () {
        clearInterval(timer);
        $("#main-banner .btn-arrow").show();
    }).mouseout(function () {
        autoplay();
        $("#main-banner .btn-arrow").hide();
    });

    // ����ҳ�ĵ������ʵ��
    $("#main-banner .next").click(function () {
        move();
    })
    $("#main-banner .prev").click(function () {
        move(false);
    })

    // ��װ��һ���Զ����ŵĺ���
    function autoplay() { // bool�������������һ���
        clearInterval(timer); // Ҫ�ö�ʱ�����嶨ʱ��
        timer = setInterval(function () {
            move();
        },3000);
    }

    // ��װ��һ�������ҳ��ť�л�ͼƬ�ĺ���
    function move(bool) {
        if(flag){
            flag = false; // ÿ��ִ�ж���ʱ������flag�رգ���Ϊfalse��ֻ�ж���ִ����ɺ�ű�Ϊtrue

            if(typeof bool != "undefined" && bool == false){
                index--;
            }else if (typeof bool == "undefined" || bool == true){
                index++;
            }

            // ����left�ķ�Χ
            if(index >= liLength){
                $("#main-banner>ul").css("left",0);
                index = 1;
            }
            if(index < 0){
                $("#main-banner>ul").css("left", -(liLength - 1)*$("#main-banner").width());
                index = liLength - 2;
            }

            $("#main-banner>ul").stop().animate({
                left: -index * $("#main-banner").width()
            },600,function () {
                $("#main-banner>ul>li>.content>a").removeClass("run");
                $("#main-banner>ul>li").eq(index).find("a").addClass("run");
                flag = true; // ���ÿ���ԭ��ֻ���ڵ�ǰ����ִ����ɺ���ܽ�����һ��������ǰflag�򿪣���Ϊtrue��
            });
        }
    }
})
