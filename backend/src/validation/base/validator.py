import re
from abc import ABC, abstractmethod


class BaseValidator(ABC):
    def __init__(self, ip_address: str | None = None):
        self.__ip_address: str | None = ip_address

    @property
    def ip_address(self) -> str | None:
        return self.__ip_address

    @ip_address.setter
    def ip_address(self, ip_address: str):
        self.__ip_address = ip_address

    @abstractmethod
    def validate(self):
        raise NotImplementedError

    @staticmethod
    def is_valid_ip(ip: str):
        pattern = re.compile(r"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
        return bool(pattern.match(ip))
