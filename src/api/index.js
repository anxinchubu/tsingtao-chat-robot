import {request} from '@/utils/request'


export function test(){
    return request({
        url: '/knowledge_base/list_knowledge_bases',
        method: 'get'
    })
}

export function test2(data){
    return request({
        url: '/chat/knowledge_base_chat',
        method: 'post',
        data: data
    })
}
