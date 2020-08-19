class vueIosScroller {
    constructor() {
        this._startPoint = null;
        this.el = null;
    }

    install(
        Vue,
        { name , vertical } = {
            name: "bounce",
            vertical: false
        }
    ) {
        name = name || "bounce";
        // console.log(name, vertical);
        const directive = (el, binding) => {
            if (binding.value) return false;
            var _handleStart = this._touchstartEvent.bind(this, el);
            el.addEventListener("touchstart", _handleStart);
        };

        window.addEventListener("touchend", this._touchendEvent.bind(this));

        if (vertical) {
            window.addEventListener("touchmove", this._touchmoveEvent.bind(this), {
                passive: false
            });
        } else {
            window.addEventListener("touchmove", this._touchmoveEventHor.bind(this), {
                passive: false
            });
        }
        

        Vue.directive(name, {inserted: directive.bind(this)});
    }

    _getScrollTop(el) {
        // 获取滚动高度
        return el.scrollTop;
    }

    _getScrollHeight(el) {
        // 滚动内容的高度
        return el.scrollHeight;
    }

    _getClientHeight(el) {
        // 滚动容器的高度
        return el.clientHeight;
    }

    _getPoint(e) {
        // 获取手指位置
        return {
            x: e.touches ? e.touches[0].pageX : e.clientX,
            y: e.touches ? e.touches[0].pageY : e.clientY
        };
    }

    _preventDefault(e) {
        // 在可以阻止的时候阻止滚动行为
        if (e.cancelable) e.preventDefault();
    }

    _touchstartEvent(el, e) {
        this._startPoint = this._getPoint(e);
        this.el = el;
    }

    _touchmoveEvent(e) {
        if (!this._startPoint || !this.el) {
            //起点为 空!!!直接退出了
            return void 0;
        }

        const curPoint = this._getPoint(e); // 当前点
        const moveX = curPoint.x - this._startPoint.x;
        const moveY = curPoint.y - this._startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
        const scrollTop = this._getScrollTop(this.el); // 当前滚动条的距离
        if ((moveY > 0 && scrollTop <= 0) || Math.abs(moveX) > Math.abs(moveY)) {
            //触顶，然后下滑 被阻止  或者  左右滑动 被阻止
            this._preventDefault(e);
            return void 0;
        }

        const scrollHeight = this._getScrollHeight(this.el); // 滚动内容的高度
        const clientHeight = this._getClientHeight(this.el); // 滚动容器的高度
        const toBottom = scrollHeight - clientHeight - scrollTop; // 滚动条距离底部的距离
        if (moveY < 0 && toBottom <= 0) {
            //触底，然后上滑 被阻止
            this._preventDefault(e);
        }
    }

    _touchmoveEventHor(e) {
        if (!this._startPoint || !this.el) {
            //起点为 空!!!直接退出了
            return void 0;
        }

        const curPoint = this._getPoint(e); // 当前点
        const moveX = curPoint.x - this._startPoint.x;
        const moveY = curPoint.y - this._startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
        const scrollTop = this._getScrollTop(this.el); // 当前滚动条的距离
        if (Math.abs(moveX) > Math.abs(moveY)) {
            //触顶，然后下滑 被阻止  或者  左右滑动 被阻止
            this._preventDefault(e);
            return void 0;
        }
    }

    _touchendEvent(e) {
        this._startPoint = null;
        this.el = null;
    }
}

export default new vueIosScroller();
