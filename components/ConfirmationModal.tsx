"use client";

import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";

interface Props {
    userName: string;
    isPending: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({
    userName,
    isPending,
    onConfirm,
    onCancel,
}: Props) {
    return (
        <Modal title="Remover usuário" onClose={onCancel}>
            <p className="mt-2 text-sm text-gray-500">
                Tem certeza que deseja remover{" "}
                <span className="font-medium text-gray-700">{userName}</span>?
                Esta ação não pode ser desfeita.
            </p>
            <div className="mt-5 flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    disabled={isPending}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isPending}
                    className="relative cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span className={isPending ? "invisible" : ""}>
                        Remover
                    </span>
                    {isPending && (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <Spinner size={14} />
                        </span>
                    )}
                </button>
            </div>
        </Modal>
    );
}
