import instantiateComponent from '../BabelDom/instantiateComponent.js'

function render(element, node) {

    var component = instantiateComponent(element) // 对语法树element进行实例化
    var renderDom = component.mountComponent() // 调用实例方法获取真实dom节点(递归交给了DomComponent和Component)

    // 将真实dom节点插入到页面根节点上
    node.append(renderDom)
}

export default render