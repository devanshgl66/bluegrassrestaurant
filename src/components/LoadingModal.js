import React from 'react'
import {Modal} from 'reactstrap'
import ModalBody from 'reactstrap/lib/ModalBody'
import {Loading} from './Loading'
export const LoadingModal=(props)=>{
    return (
        <Modal isOpen={props.isOpen}>
            <ModalBody>
                <Loading/>
            </ModalBody>            
        </Modal>
    )
}
