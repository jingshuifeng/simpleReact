
import DOM from './Dom.js'
import instantiateComponent from './instantiateComponent'


class DomComponent {
    constructor(element) {
        this._currentElement = element
        this._domNode = null
    }

    mountComponent() {
        // 生成真实的dom节点并返回
        var node = document.createElement(this._currentElement.type)
        this._domNode = node
        this._renderDomChildren(this._currentElement.props)
        return node
    }

    updateComponent(preElement, nextElement) {
        this._currentElement = nextElement
        this._updateChildren(preElement.props, nextElement.props)
    }

    _updateChildren(prevProps, nextProps) {
        var prevType = typeof prevProps.children
        var nextType = typeof nextProps.children
        if (nextType === 'undefined') {
            return
        }
        DOM.empty(this._domNode)

        if (nextType === 'string' || nextType === 'number') {
            this._domNode.textContent = nextProps.children
        } else {
            if (Array.isArray(nextProps.children)) {
                const childElements = nextProps.children
                const chidNodes = childElements.map((childElement) => {
                    return instantiateComponent(childElement).mountComponent()
                })
                DOM.appendChildren(this._domNode, chidNodes)
            } else {
                var childElement = nextProps.children
                var chidNode = instantiateComponent(childElement).mountComponent()
                DOM.appendChildren(this._domNode, chidNode)
            }
        }
    }
    // 处理子节点
    _renderDomChildren(props) {
        if (typeof props.children === 'string' || typeof props.children === 'number') {
            // 子节点是数字或者字符串
            var textNode = document.createTextNode(props.children)
            this._domNode.appendChild(textNode)
        } else if (props.children) {
            var childrenNodes
            // 子节点是个数组
            if (Array.isArray(props.children)) {
                childrenNodes = props.children.map((el) => {
                    // 递归调用处理语法树的方法形成真实的dom
                    return instantiateComponent(el).mountComponent()
                })
            } else {
                // 子节点是个对象,递归调用处理语法树的方法形成真实dom
                childrenNodes = instantiateComponent(props.children).mountComponent()
            }
            DOM.appendChildren(this._domNode, childrenNodes)
        }
    }
}

export default DomComponent