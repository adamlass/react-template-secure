import React from "react"

import { Table, Button, Modal, FormControl, Grid, Row, Col } from "react-bootstrap"
import { handleHttpErrors, makeOptions } from "../utils/FacadeUtils";

export default class GenericTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: false, editObj: null }
    }

    handleEdit = obj => {
        //copy object
        var editObj = Object.assign({}, obj)
        this.setState({ editObj })
        this.handleShow()
    }

    handleRemove = async obj => {
        var id = obj[this.getId()]
        await this.props.facade.delete(id)
        this.props.update()
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleEditing = (e) => {
        var target = e.target
        var key = target.id.split("_")[1]
        var editObj = this.state.editObj
        editObj[key] = e.target.value
        this.setState({ editObj })
    }

    handleSave = async () => {
        var facade = this.props.facade
        await facade.update(this.state.editObj)
        this.handleClose()
        this.props.update()
    }

    getId = () => {
        return this.props.idName ? this.props.idName : "id"
    }

    render() {
        if (this.props.data) {
            var data = Object.assign([], this.props.data)
            if (data.length > 0) {

                var edit = this.props.edit
                var idName = this.getId()

                var remove = this.props.remove

                var biggestSetOfKeys
                for (const obj of data) {
                    var keys = Object.keys(obj)
                    if (biggestSetOfKeys) {
                        if (keys.length > biggestSetOfKeys.length) {
                            biggestSetOfKeys = keys
                        }
                    } else {
                        biggestSetOfKeys = keys
                    }
                }

                console.log("biggest keys: " + biggestSetOfKeys)
                var thead = biggestSetOfKeys.map(e => (
                    <th key={"table_th_" + e}>{e.toLocaleUpperCase()}</th>
                ))

                for (const obj of data) {
                    for (const key of biggestSetOfKeys) {
                        if (!obj[key]) {
                            obj[key] = null
                        }
                    }
                }



                if (!this.props.update) {
                    console.log("WARNING - Generic Table does not contain 'update' function!!")
                    edit = null
                    remove = null
                }

                if (edit) {
                    thead.push(<th key={"table_th_edit"}>EDIT</th>)
                }
                if (remove) {
                    thead.push(<th key={"table_th_remove"}>REMOVE</th>)
                }
                var content = data.map((e, i) => (
                    <tr key={"id_" + i} >
                        {Object.values(e).map((val, j) => (
                            <td onClick={edit ? () => this.handleEdit(e) : null} key={"table_td_" + j}>{typeof val == "object" ? biggestSetOfKeys[j] + ": " + JSON.stringify(val) : val}</td>
                        ))}

                        {edit ? <td><Button bsStyle="warning" onClick={() => this.handleEdit(e)}>Edit</Button></td> : null}
                        {remove ? <td><Button bsStyle="danger" onClick={() => this.handleRemove(e)}>Remove</Button></td> : null}
                    </tr>
                ))

            }
            var editObj = this.state.editObj
            var form

            if (editObj) {
                var keys = Object.keys(editObj)
                form = Object.values(editObj).map((element, i) => (
                    <>
                        <h4>{keys[i].toLocaleUpperCase()}</h4>
                        <FormControl
                            id={"edit_" + keys[i]}
                            value={element}
                            onChange={this.handleEditing}
                            disabled={keys[i] === idName || typeof element === "object" ? true : false}
                        />

                        <br />
                    </>
                ))
            }

        }

        return (
            <>
                <Grid>

                    <Row>

                        <Col md={12} xs={12} lg={12}>

                            <Table hover striped>
                                <thead>
                                    <tr>
                                        {thead ? thead : <td>No Data</td>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                            </Table>

                        </Col>
                        <>
                            {
                                this.state.show ?
                                    <div className="static-modal">
                                        <Modal.Dialog onHide={this.handleClose}>
                                            <Modal.Header>
                                                <Modal.Title>Edit Entry</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {/* {JSON.stringify(this.state.editObj)} */}
                                                <form>
                                                    {form}
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={this.handleClose}>Close</Button>
                                                <Button bsStyle="success" style={{ float: "left" }} onClick={this.handleSave}>Save</Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>
                                    </div>
                                    : null
                            }

                        </>
                    </Row>
                </Grid>

            </>
        )
    }
}