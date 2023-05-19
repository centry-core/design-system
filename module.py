#!/usr/bin/python3
# coding=utf-8

#   Copyright 2021 getcarrier.io
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

""" Module """

from pylon.core.tools import log  # pylint: disable=E0611,E0401
from pylon.core.tools import module  # pylint: disable=E0611,E0401


class Module(module.ModuleModel):
    """ Pylon module """

    def __init__(self, context, descriptor):
        self.context = context
        self.descriptor = descriptor

        self.aside = []

    def init(self):
        """ Init module """
        log.info("Initializing module")
        # Init Blueprint
        self.descriptor.init_blueprint()

        if self.context.debug:
            self.descriptor.init_slots()

            from tools import theme

            theme.register_mode(
                "developer", "Developer",
                permissions=[],
            )
            theme.register_mode_section(
                "developer", "design-system", "Design System",
                kind="holder",
                location="left",
                weight=33,
                permissions=[],
            )

            from pathlib import Path
            weight = 100
            for section in sorted((i for i in Path(self.descriptor.path, 'templates').iterdir() if i.is_dir())):
                self.register_ds_section(section.name, weight=weight)
                weight -= 1

    def deinit(self):  # pylint: disable=R0201
        """ De-init module """
        log.info("De-initializing module")

    def render_content(self, context, slot, payload):
        _, folder, file = slot.split('_')
        with context.app.app_context():
            return self.descriptor.render_template(
                f'{folder}/{file}.html',
                payload=payload,
                context=context,
                aside_list=list(
                    map(
                        lambda i: i['name'],
                        sorted(self.aside, key=lambda i: -i['weight'])
                    )
                )
            )

    def register_ds_section(self, name: str, **kwargs):
        for i in ['content', 'scripts', 'styles']:
            self.context.slot_manager.register_callback(
                f'design-system_{name}_{i}',
                self.render_content
            )

        from tools import theme
        theme.register_mode_subsection(
            "developer", "design-system",
            name, name.capitalize(),
            permissions=[],
            title=f"DS - {name.capitalize()}",
            kind="slot",
            prefix=f"design-system_{name}_",
            **kwargs
        )

        self.aside.append({'name': name, 'weight': kwargs.get('weight', 0)})
