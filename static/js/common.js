/**
 * Created by qingya on 16/1/11.
 */
    //适配

(function setWindowSize() {
    window.scrollTo(0, 1);
    var w = window.innerWidth;
    var h = window.innerHeight;
    s = w / 750;
    document.getElementById('viewport').content = "width=750, initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no, target-densitydpi=device-dpi";
})();



