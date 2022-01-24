import { useEffect, useState } from 'react';

const useDocumentTitle = (title: string) => {
    const [documentTitle, setDoucmentTitle] = useState(title);
    
    useEffect(() => {
        window.document.title = documentTitle;
    }, [documentTitle]);

    return { setDoucmentTitle };
};

export default useDocumentTitle;