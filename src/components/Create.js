import React ,{Component} from "react"
import GenericCreate from "../utils/GenericCreate"

var keys = {
    name:"text",
    birth: "date",
    death: "date",
    species:"text",
}

export default ({facade}) => (
    <GenericCreate facade={facade} keys={keys} />
)