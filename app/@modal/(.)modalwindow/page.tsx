'use client'import { useState, useCallback, ChangeEvent } from "react";import {    Dialog,    DialogContent,    DialogFooter,    DialogTrigger,} from "@/components/ui/dialog"import { Input } from "@/components/ui/input"import { Button } from "@/components/ui/button";import Choice from "@/app/components/Choice";export default function ModalWindowPage() {    const [title, setTitle] = useState<string>('')    const [isClicked, setIsClicked] = useState<boolean>(false);    const [data, setData] = useState({});    const handleClick = useCallback(() => {        title.length > 0 && setIsClicked(true)        title.length > 0 && setData((prevState) => ({...prevState, [title]: {...prevState[title]}}))    },[title])    const handleInputChange = useCallback((event:ChangeEvent<HTMLInputElement>) => {        const {name, value} = event.target;        const data = name.split('-')[1];        setData((prevState) => ({...prevState, [title]: {                ...prevState[title],                [data]: {                    ...prevState[title][data],                    text: value,                }            }}))    },[title])    const handleSelectChange = useCallback((value:string) => {        const data = value.split("-");        setData((prevState) => ({...prevState, [title]: {                ...prevState[title],                [data[1]]: {                    ...prevState[title][data[1]],                    choice: data[0]                }            }}))    },[title])    const handleSaveData = () => {        console.log(JSON.stringify(data));    };    return <Dialog>        <DialogTrigger>Open</DialogTrigger>        <DialogContent className="sm:max-w-[425px]">            <div className="grid gap-4 py-4">                <Input name="" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title"/>            </div>            <div className="text-right">                {(title.length > 0 && isClicked) && <Choice handleInputChange={handleInputChange} handleSelectChange={handleSelectChange}/>}                <Button onClick={handleClick}>+</Button>            </div>            <DialogFooter>                <Button onClick={handleSaveData}>Save Changes</Button>            </DialogFooter>        </DialogContent>    </Dialog>}