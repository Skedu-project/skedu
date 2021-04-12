import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import classNames from 'classnames/bind';
import styles from'./DarkMode.scss';
import Toggle from './Toggle';
const style = classNames.bind(styles);

const SettingsModal = (props) =>{
    
    const darkMode = useDarkMode(false);

    return (
      <div className="dark-modal-toggle">
          <Modal isOpen={props.isOpen}>
              <ModalHeader>Dark Mode</ModalHeader>
              <ModalBody> 
                <Button type="toggle" onClick={darkMode.disable} className={style('text')}>
                    ☀
                </Button>
                <Toggle checked={darkMode.value} onChange={darkMode.toggle}/>
                <Button type="toggle" onClick={darkMode.enable} className={style('text')}>
                    ☾
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={props.onClose}>Cancel</Button>
              </ModalFooter>
            </Modal>
      </div>
    )
}

export default SettingsModal;