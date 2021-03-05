import { FunctionalComponent, h, RefObject } from 'preact'

interface ButtonProps {
    containerRef?: RefObject<HTMLButtonElement>
    text: string
    handleClick: (ev: Event) => void
    uid: string
}

export const Button: FunctionalComponent<ButtonProps> = ({
    containerRef,
    text,
    handleClick,
    uid,
}: ButtonProps) => {
    return (
        <div class="px-3 py-1.5">
            <button
                ref={containerRef}
                type="button"
                onClick={handleClick}
                data-selectable
                data-selected-uid={uid}
                class="text-primary text-center w-full p-1.5 border-2 border-gray-400 rounded-full mx-auto disabled:opacity-70"
            >
                {text}
            </button>
        </div>
    )
}
