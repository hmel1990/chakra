import React from "react"
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"

import './Dialog.css'


export default function Demo (props) {
    const [selected, setSelected] = useState(0)
    const [description,  setDescription] = useState('')
    return (
        <div className="filmsContainer">
            {props.films.map((film, index) => (
                <React.Fragment key={index}>
                    <div className="filmContainer">
                        <div className="filmTitle">{film.title}</div>

                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelected(index)}
                                    className="Button"
                                >
                                    Информация о фильме
                                </Button>
                            </Dialog.Trigger>

                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title style={{ textTransform: "capitalize" }}>
                                                {props.films[selected].title}
                                            </Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <p>{props.films[selected].description}</p>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </Dialog.ActionTrigger>
                                            <Button onClick={() => setDescription(props.films[selected].description)}>
                                                Save
                                            </Button>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </div>

                    {selected === index &&
                        description &&
                        (<div className="filmDescription">{description}</div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}