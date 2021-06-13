
import instantiateComponent from '../BabelDom/instantiateComponent'
// 复合组件
class Component {
    constructor() {
        this._pendingState = null
        this._currentElement = null
        this._renderComponent = null
    }

    _constructor(element) {
        // render渲染的时候调用这个方法保存组件的element
        this._currentElement = element
    }

    setState(partialState) {
        // 更新时保存state用来区分是否需要更新
        this._pendingState = Object.assign({}, this.setState, partialState)

        // 因为组件自身的element是没有变化的,但是接下来的子节点对比需要两个参数,方便递归
        this.updateComponent(this._currentElement, this._currentElement)
        
    }

    // 1.核心 element
    // 2. 新旧 element
    updateComponent(preElement, nextElement) {
        // 1. nextElement 更新当前的组件 element的引用
        this._currentElement = nextElement

        this.props = nextElement.porps // 将props重新赋值
        this.state = this._pendingState // 将state重新赋值
        this._pendingState = null

        var preRenderElement = this._renderComponent._currentElement // 子组件的旧element
        var nextRenderElement = this.render() // 再执行一次render取得子组件的新element

        // diff 算法

        if (preRenderElement.type === nextRenderElement.type) {
            this._renderComponent.updateComponent(this._renderComponent._currentElement, nextRenderElement)
        } else {
            // preRenderElement 对应的真是节点删掉  渲染 nextRenderElement 对象的dom
        }
    }

    mountComponent() {  
        // 规定了每个实例都会有render函数,所以可以通过this.render取得element语法树
        var renderElment = this.render()
        var renderComponent = instantiateComponent(renderElment)
        this._renderComponent = renderComponent
        var renderNode = renderComponent.mountComponent()

        return renderNode
    }
}

export default Component