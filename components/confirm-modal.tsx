"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ConfirmModal({
  description,
  onConfirmClick,
  trigger,
}: {
  description: string;
  onConfirmClick: () => void;
  trigger: (arg: () => void) => void;
}) {
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      {trigger(toggle)}
      <Modal show={openModal} size="md" onClose={toggle} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {description}
            </h3>
            <div className="flex flex-col justify-center gap-2 sm:flex-row sm:gap-4">
              <Button
                color="failure"
                onClick={() => {
                  onConfirmClick();
                  toggle();
                }}
              >
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={toggle}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
