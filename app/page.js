'use client'

import { useSelector } from 'react-redux';
import ToolTabData from '../app/api/ToolsTabData';
import Container from '../components/container/Container';
import H1 from '../components/ui/H1';
import P from '../components/ui/P';
import { ToolsTab } from '../components/ui/ToolsTab';

const Home = () => {
    const status = useSelector(state => state.auth.status)
    return (
        <>
            <Container>
                <H1
                    text='AI That Codes, Explains & Debugs For You'
                />
                <P
                    text='Your all-in-one AI coding partner to write code, debug issues, and explain any code.'
                />

                {
                    status ?
                (<div className="grid gap-[4rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center items-center">
                    {
                        ToolTabData.map(curElem => {
                            return <ToolsTab content={curElem} key={curElem.id} />
                        })
                    }
                </div>)
                :
                (<p>Login to get started...</p>)
                }
            </Container>
        </>
    )
}

export default Home;

