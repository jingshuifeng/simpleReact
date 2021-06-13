/**
 * 编辑element,根据element.type的值不同(function, string)
 * 返回一个实例,实例中的mountComponent方法可以得到真实的dom
 * 两种情况:1.自定义组件,2.原生dom标签
 */
import DomComponent from './DomComponent'


// 将element变为组件并且实例化
function instantiateComponent(element) {
    var componentInstance
    if (typeof element.type === 'function') {
        // type是自定义组件,那么直接实例化
        componentInstance = new element.type(element.props)
        componentInstance._constructor(element)
    } else if (typeof element.type ==='string') {
        // type是dom标签,调用DomComponent进行实例化
        componentInstance = new DomComponent(element)
    } else if (typeof element === 'string' ||  typeof element === 'number') {
        // 手动创建一个语法树的节点,调用DomComponent进行实例化
        componentInstance = new DomComponent({
            type: 'span',
            props: {children: element}
        })
    }
    return componentInstance
}

export default instantiateComponent