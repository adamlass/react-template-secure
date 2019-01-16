import React, { Component } from "react"

import { Col, FormControl, Button } from "react-bootstrap"
import { handleHttpErrors, makeOptions } from "../facade/FacadeUtils";
import GenericTable from "./GenericTable";


export default class GenericCreate extends Component {
    constructor() {
        super()
        this.state = { obj: {}, objectsCreated: [] }
    }

    handleEditing = (e) => {
        var target = e.target
        var key = target.id.split("_")[1]
        var obj = this.state.obj
        obj[key] = e.target.value
        this.setState({ obj })
    }

    post = async () => {
        var options = makeOptions("post", true, this.state.obj)
        try {
            const res = await fetch(this.props.URI, options)
            console.log(res)
            const json = await handleHttpErrors(res)
            console.log("JSON: " + json)
            var objectsCreated = Object.assign([], this.state.objectsCreated)
            objectsCreated.push(json)
            this.setState({ objectsCreated })

        } catch (error) {
            alert("Status: " + error.status + "\nFull Error: " + JSON.stringify(error.fullError))
        }
    }

    render() {
        var keys = this.props.keys
        console.log("keys: " + keys)
        var form = Object.keys(keys).map((key, i) => (
            <>
                <h4>{key.toUpperCase()}</h4>
                <FormControl
                    id={"field_" + key}
                    onChange={this.handleEditing}
                    type={keys[key]}
                />
            </>
        ))

        return (
            <>
                {/* <p>{JSON.stringify(this.state.obj)}</p> */}
                <Col md={6} xs={12}>
                    <h1>Create</h1>
                    <form>
                        {form}
                        <br />
                        <Button bsStyle="success" onClick={this.post} value="Save">Save</Button>
                    </form>
                </Col>
                {
                    this.state.objectsCreated.length > 0 ?
                        <Col md={6} xs={12}>
                            <h1>Created Objects</h1>
                            <GenericTable data={this.state.objectsCreated} />
                        </Col>
                        :
                        null
                }
            </>
        )
    }
}