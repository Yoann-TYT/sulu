<?php

namespace Sulu\Bundle\ContactBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use JMS\Serializer\Annotation\Groups;
/**
 * Position
 */
class Position implements JsonSerializable
{
    /**
     * @var string
     * @Groups({"fullContact", "partialContact"})
     */
    private $position;

    /**
     * @var integer
     * @Groups({"fullContact", "partialContact"})
     */
    private $id;


    /**
     * Set position
     *
     * @param string $position
     * @return Position
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return string
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * (PHP 5 &gt;= 5.4.0)<br/>
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     */
    public function jsonSerialize()
    {
        return [
            'id'=>$this->getId(),
            'position'=>$this->getPosition()
        ];
    }
}