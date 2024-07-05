from abc import ABC, abstractmethod


class BaseValidator(ABC):

    def __init__(self, ip_address, identifier):
        self.__ip_address = ip_address
        self.__identifier = identifier

    @property
    def ip_address(self) -> str:
        if not self.__ip_address:
            raise ValueError

        return self.__ip_address

    @ip_address.setter
    def ip_address(self, value) -> None:
        self.__ip_address = value

    @property
    def identifier(self):
        if not self.__identifier:
            raise ValueError

        return self.__identifier

    @identifier.setter
    def identifier(self, value):
        self.__identifier = value

    @abstractmethod
    def validate_connection(self) -> bool:
        raise NotImplementedError
