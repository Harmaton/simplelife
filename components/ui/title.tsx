import React from "react";

function Title({ title = 'Welcome' }: { title: string }) {
    return (
        <h2 className="text-md text-violet-500 border border-violet-500 inline-block p-2 rounded-[100%] mb-4" data-aos="fade-up">{title}</h2>
    )
}

export default Title;