/**
 * 接收的参数,从第3个参数开始,后面的都是子节点
 * 返回的参数长什么样子
 * {
 *  type: 'span',
 *  props: { id: 1, children: 'xxx'},
 * }
 */

// 参数为三个的时候直接将children赋值个props
// 参数大于三个的时候将后面的参数以数组的形式赋值给props.children
function createElement(type, config, children) {
    const props = Object.assign({}, config)
    // 判断参数长度
    const childrenLenth = [].slice.call(arguments).length - 2
    if (childrenLenth > 1) {
        props.children = [].slice.call(arguments, 2)
    } else if (childrenLenth === 1) {
        // 长度 = 1
        props.children = children
    }

    return {
        type,
        props
    }
}

export default createElement