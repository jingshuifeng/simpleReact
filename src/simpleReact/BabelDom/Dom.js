function appendChildren(node, children) {
    if (Array.isArray(children)) {
        children.forEach((child) => node.appendChild(child))
    } else {
        node.appendChild(children)
    }
}

function empty(node) {
    [].slice.call(node.childNodes).forEach((child) => {
        node.removeChild(child)
    })
}


export default {
    appendChildren,
    empty
}